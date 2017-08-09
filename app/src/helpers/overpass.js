r.define(["Api/util/array",
		  "Api/util/string",
		  "Api/util/ajax",
		  "Api/components/promise"],

	function (Array,
			  String,
			  Ajax,
			  Promise) {

	    return { 
			overpass : null,
		
			Identify : function(xy, radius) {
				var p = new Promise();
				
				var url = this.overpass.url + '?data=[out:json][timeout:60];(node["amenity"](around:{0},{1},{2});node["shop"](around:{0},{1},{2});way["building"](around:{0},{1},{2});>);out meta;'
				
				url = String.Format(url, [radius, xy.y, xy.x]);

				Ajax.Get(url).then(OnSuccess.bind(this), p.Reject);
				
				return p;
				
				function OnSuccess(data) {
					var features = this.OverpassToOpenlayersFeatures(data);
					
					features = this.CategorizeFeatures(features);
					
					p.Resolve(features);
				}
			},
			
			CategorizeFeatures(features, categories) {
				var oFeatures = {};
				
				// Note : This only finds the first building and the first amenity or shop. This is done on 
				// purpose becasue we don't currently handle multiple records.
				oFeatures.building = Array.Find(features, function(f) { 
					var tags = f.getProperties().tags;
					
					if (!f.nodes) return false; // Not a way so not a building
					
					return tags.hasOwnProperty("building");
				});
				
				oFeatures.poi = Array.Find(features, function(f) { 
					var tags = f.getProperties().tags;
					
					if (f.nodes) return false; // It's a way so not a POI
					
					return tags.hasOwnProperty("amenity") || tags.hasOwnProperty("shop");
				});
				
				return oFeatures;
			},
		
			IdentifyBuilding : function(xy, radius){
				var p = new Promise();
				
				// NOTE : Openstreetmap has serious limitations when it comes to querying the data it contains. The two following API
				//		  calls are the best I managed to do for now.
				// NOTE : This url will only return features as long as the radius around the clicked point contains a node or a way
				var url = this.overpass.url + '?data=[out:json][timeout:60];(node["amenity"](around:{0},{1},{2});way["building"](around:{0},{1},{2});>);out meta;'

				// NOTE : This url will return ways that are in an area that contain  the clicked point. The problem is, an area must be 
				// 		  defined for this to work. Usually, this works with big commercial buildings, not residences.
				// var url = 'http://overpass-api.de/api/interpreter?data=[out:json][timeout:30];is_in({0},{1})->.a;(way["building"](pivot.a);>);out;';
				
				url = String.Format(url, [radius, xy.y, xy.x]);
				
				Ajax.Get(url).then(OnSuccess.bind(this), p.Reject);
				
				return p;
				
				function OnSuccess(data) {
					var features = this.OverpassToOpenlayersFeatures(data);
					
					p.Resolve({ building:(features.length > 0 ? features[0] : null) });
				}
			},
			
			IdentifyPOI : function(xy, radius) {
				var p = new Promise();

				var url = this.overpass.url + '?data=[out:json][timeout:60];(node["amenity"](around:{0},{1},{2});node["shop"](around:{0},{1},{2}););out;>;';
				
				url = String.Format(url, [radius, xy.y, xy.x]);

				Ajax.Get(url).then(OnSuccess.bind(this), p.Reject);
				
				return p;
				
				function OnSuccess(data) {					
					var features = this.OverpassToOpenlayersFeatures(data);
					
					p.Resolve({ poi:(features.length > 0 ? features[0] : null) });
					
					/*
					Array.ForEach(features, function(f) {
						f.setStyle(Styles["POI"]);
						
						this.vLayer.getSource().addFeature(f);
					}.bind(this));
					*/
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
			}
		}
	});