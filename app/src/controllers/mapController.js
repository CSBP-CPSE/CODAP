
r.define(["Api/util/lang",
		  "Api/util/ajax",
		  "Api/util/string",
		  "Api/util/project",
		  "Api/util/array",
		  "Api/components/promise",
		  "App/config/styles",
		  "Exp/util/osmAuth",
		  "Exp/components/controller"],
    
	function (Lang,
			  Ajax,
			  String,
			  Project,
			  Array,
			  Promise,
			  Styles,
			  OsmAuth,
			  Controller) {

		var mapController = Lang.Declare("MapController", [Controller], { 
		
			model : null,
			options : null,
			
			vLayer : null,
			bLayer : null,
			
			busy : false,
			
			constructor : function(options) {				
				this.options = {
					view : options.view,
					tolerance : options.tolerance,
					overpass : options.overpass
				}	
				
				this.CreateMap();
				
				this.model = {
					Map : this.map,
					Selected : null,
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
					ev.preventDefault();
				}
				
				if (this.map.getView().getZoom() < 16) {
					this.NotifyViewMessage("Please zoom in further before trying to select a building.");
					ev.preventDefault();
				}
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
				this.busy = true;
			
				var p = new Promise();
				var xy = Project.Point(coordinate[0], coordinate[1], "900913", 4326);
				
				// NOTE : Openstreetmap has serious limitations when it comes to querying the data it contains. The two following API
				//		  calls are the best I managed to do for now.
				// NOTE : This url will only return features as long as the radius around the clicked point contains a node or a way
				var url = this.options.overpass.url + '?data=[out:json][timeout:60];(way["building"](around:{0},{1},{2});>);out meta;'

				// NOTE : This url will return ways that are in an area that contain  the clicked point. The problem is, an area must be 
				// 		  defined for this to work. Usually, this works with big commercial buildings, not residences.
				// var url = 'http://overpass-api.de/api/interpreter?data=[out:json][timeout:30];is_in({0},{1})->.a;(way["building"](pivot.a);>);out;';

				var radius = this.map.getView().getResolution() * this.options.tolerance;
				
				url = String.Format(url, [radius, xy.y, xy.x]);
				
				Ajax.Get(url).then(OnSuccess.bind(this), OnError.bind(this));
				
				return p;
				
				function OnSuccess(data) {
					this.busy = false;
					
					var features = this.OverpassToOpenlayersFeatures(data);
					
					p.Resolve({ feature:(features.length > 0 ? features[0] : null) });
				}
				
				function OnError(error) {
					this.busy = false;
					
					p.Reject(error);
					
					this.NotifyViewError.bind(this);
				}
			},			
			
			OverpassToOpenlayersFeatures : function(opData) {
				var json = JSON.parse(opData);
				var geojson = osmtogeojson(json);
				
				var format = new ol.format.GeoJSON();
				
				var opts = {
					dataProjection : 'EPSG:4326',
					featureProjection : 'EPSG:900913'
				}
				
				var features = format.readFeatures(geojson, opts);
				
				Array.ForEach(features, function(f) {
					this.AssignOSMElements(f, json.elements);
				}.bind(this));
				
				return features;
			},
			
			AssignOSMElements : function(f, elements) {
				var id = f.getProperties().id;
				
				var el = Array.Find(elements, function(el) { return el.id === id; });
				
				if (!el) return null;
				
				f.nodes = el.nodes;
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
			
			SelectFeature : function(feature) {
				this.model.Selected = feature;
				
				this.NotifyViewNewModel("Map");
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