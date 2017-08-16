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
		
			IdentifyBuilding : function(xy, radius){
				var p = new Promise();
				
				// NOTE : This url will only return features as long as the radius around the clicked point contains a node or a way
				var data = 'data=[out:json][timeout:60];(node["amenity"](around:{0},{1},{2});way["building"](around:{0},{1},{2});>);out meta;'
				
				var url = this.overpass.url + '?' + this.PreventCache() + '&' + String.Format(data, [radius, xy.y, xy.x]);
				
				Ajax.Get(url).then(OnSuccess.bind(this), p.Reject);
				
				return p;
				
				function OnSuccess(data) {
					var features = this.OverpassToOpenlayersFeatures(data);
					
					p.Resolve({ feature:(features.length > 0 ? features[0] : null) });
				}
			},
			
			IdentifyPOI : function(xy, radius) {
				var p = new Promise();

				var data = 'data=[out:json][timeout:60];(node["amenity"](around:{0},{1},{2});node["shop"](around:{0},{1},{2}););out meta;>;';
				
				var url = this.overpass.url + '?' + this.PreventCache() + '&' + String.Format(data, [radius, xy.y, xy.x]);

				Ajax.Get(url).then(OnSuccess.bind(this), p.Reject);
				
				return p;
				
				function OnSuccess(data) {					
					var features = this.OverpassToOpenlayersFeatures(data);
					var f = (features.length > 0 ? features[0] : null)
					
					var type = null;
					
					if (f) {
						var tags = f.getProperties().tags;
						type = tags.hasOwnProperty("amenity") ? "amenity" : "shop" ;
					}
					
					p.Resolve({ feature:f, type:type });
				}
			},
			
			PreventCache : function() {
				var d = new Date();
				
				return "bust=" + d.getTime();
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