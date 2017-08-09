
r.define(["Api/util/lang",
		  "Api/util/ajax",
		  "Api/util/string",
		  "Api/util/project",
		  "Api/util/array",
		  "Api/components/promise",
		  "App/config/styles",
		  "App/helpers/overpass",
		  "Exp/util/osmAuth",
		  "Exp/components/controller"],
    
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
					this.NotifyViewMessage("The map controller is busy please wait for previous operation to complete.");
					return;
				}
				
				if (this.map.getView().getZoom() < 16) {
					this.NotifyViewMessage("Please zoom in further before trying to select a building.");
					return;
				}
				
				this.busy = true;
				
				this.AddSearchFeature(ev.coordinate);
				
				var p = this.IdentifyFeatures(ev.coordinate);
				
				p.then(this.onMap_FeaturesIdentified.bind(this), this.onMap_Error.bind(this));
			},
			
			onMap_FeaturesIdentified : function(ev) {
				this.busy = false;
				
				this.model.POI = ev.poi;
				this.model.Building = ev.building;
				
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
				
				this.vLayer.getSource().addFeature(f);
			},
			
			SetView : function(coords, zoom) {
				var view = new ol.View({ center:coords, zoom:zoom });
				
				this.map.setView(view);
			},
			
			IdentifyFeatures : function(coordinate) {	
				var radius = this.map.getView().getResolution() * this.options.tolerance;
				var xy = Project.Point(coordinate[0], coordinate[1], "900913", 4326);
				
				return Overpass.Identify(xy, radius);
				
				return p;
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
			},
			
			AddFeatures : function(features) {
				Array.ForEach(features, function(f) {
					this.AddFeature(f);
				}.bind(this))
			}
		})
		
		return mapController;
	})