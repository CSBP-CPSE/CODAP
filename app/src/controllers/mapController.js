
r.define(["Api/util/lang",
		  "Api/util/ajax",
		  "Api/util/string",
		  "Api/util/project",
		  "Api/util/array",
		  "Api/components/promise",
		  "App/config/styles",
		  "App/helpers/overpass",
		  "App/util/osmAuth",
		  "App/components/controller"],
    
	function (Lang,
			  Ajax,
			  String,
			  Project,
			  Array,
			  Promise,
			  Styles,
			  Overpass,
			  OsmAuth,
			  Controller) {

		var mapController = Lang.Declare("MapController", [Controller], { 
		
			model : null,
			options : null,
			
			busy : false,
			
			vLayer : null,
			bLayer : null,
			
			constructor : function(options) {				
				this.options = {
					view : options.view,
					tolerance : options.tolerance
				}	
				
				this.CreateMap();
				
				this.model = {
					Map : this.map,
					Building : null,
					POI : null,
					Mode : "Building",
					Geolocating : false
				};
			},
			
			CreateMap : function() {
				this.bLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
				this.vLayer = new ol.layer.Vector({ style:styleFn, source:new ol.source.Vector() });
				
				var controls = ol.control.defaults({ attributionOptions: { collapsible: true }});
				var view = new ol.View(this.options.view);
			
				this.map = new ol.Map({
					layers	: [this.bLayer, this.vLayer ],
					controls: controls,
					view	: view
				});
				
				this.map.on("click", this.onMap_Click.bind(this));
				
				function styleFn(f) {					
					return Styles[f.getGeometry().getType()];
				}
			},
			
			onMap_Click : function(ev) {
				if (this.busy) {
					this.NotifyViewMessage(Lang.Nls("Map_Busy"));
					return;
				}
				
				if (this.map.getView().getZoom() < 16) {
					this.NotifyViewMessage(Lang.Nls("Map_ZoomInMore"));
					return;
				}
				
				this.model.Selected = null;

				this.AddSearchFeature(ev.coordinate);
				
				this.IdentifyFeature(ev.coordinate);
			},
			
			IdentifyFeature : function(coordinate) {
				this.busy = true;
			
				var radius = this.map.getView().getResolution() * this.options.tolerance;
				var xy = Project.Point(coordinate[0], coordinate[1], "900913", 4326);
				
				var p = (this.model.Mode === "POI") ? Overpass.IdentifyPOI(xy, radius) : Overpass.IdentifyBuilding(xy, radius);
				
				p.then(this.onMap_FeaturesIdentified.bind(this, coordinate), this.onMap_Error.bind(this));
			},
			
			onMap_FeaturesIdentified : function(coordinate, ev) {
				this.ClearMap();
				
				this.busy = false;
				
				this.model.Selected = ev;
				
				if (this.model.Mode === "POI" && !this.model.Selected.feature) this.AddPOI(coordinate);

				else if (this.model.Mode === "Building" && this.model.Selected.feature) this.AddBuilding(this.model.Selected.feature);
				
				this.NotifyViewNewModel("Map");
			},
			
			onMap_Error : function(ev) {
				this.busy = false;
				
				this.NotifyViewError(err);
			},
			
			AddSearchFeature : function(coordinate) {
				var radius = this.map.getView().getResolution() * this.options.tolerance;
				
				var f = new ol.Feature({
					geometry : new ol.geom.Circle(coordinate, radius)
				});
				
				f.setStyle(Styles["Search"]);
				
				this.AddFeature(f);
			},
			
			SetView : function(coords, zoom) {
				var view = new ol.View({ center:coords, zoom:zoom });
				
				this.map.setView(view);
			},
			
			AddBuilding : function(building) {
				building.setStyle(Styles["Polygon"]);
				
				this.AddFeature(building);
			},
			
			AddPOI : function(coordinate) {
				var f = new ol.Feature({ geometry: new ol.geom.Point(coordinate) });
				
				f.setStyle(Styles["POI"]);
			
				this.AddFeature(f);
				
				this.model.Selected.feature = f;
			},
			
			Geolocate : function() {
				this.model.Geolocating = false;
			
				if (!navigator.geolocation) this.NotifyViewError(new Error("Geolocation is not supported by this browser."));
				
				else navigator.geolocation.getCurrentPosition(success.bind(this), this.NotifyViewError.bind(this));
				
				function success(ev) {
					var f = this.MakePointFeature(ev.coords, "Marker");
					
					this.AddFeature(f);
					
					this.SetView(f.getGeometry().getCoordinates(), 18);
					
					setTimeout(timeout.bind(this, f), 1500);
				}
				
				function timeout(f1, ev) {
					var features = this.vLayer.getSource().getFeatures();
				
					if (!Array.Find(features, function(f2) { return f1 === f2; })) return;
					
					this.vLayer.getSource().removeFeature(f1);
				}
			},
			
			MakePointFeature : function(coords, style) {
				var pt = Project.Point(coords.longitude, coords.latitude, "4326", "900913");
				
				var f = new ol.Feature({
				  geometry: new ol.geom.Point([pt.x, pt.y])
				});
				
				f.setStyle(Styles[style]);
				
				return f;
			},
			
			ClearMap : function() {
				this.vLayer.getSource().clear();
			},
			
			AddFeature : function(f) {
				this.vLayer.getSource().addFeature(f);
			}
		})
		
		return mapController;
	})