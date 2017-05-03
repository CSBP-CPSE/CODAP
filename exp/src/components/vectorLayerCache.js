
r.define(["Api/util/lang",
		  "Api/util/ajax",
		  "Api/util/string",
		  "Api/util/project",
		  "Api/util/array",
		  "Api/components/promise"],
    
	function (Lang,
			  Ajax,
			  String,
			  Project,
			  Array,
			  Promise) {

		var vectorLayerCache = Lang.Declare("VectorLayerCache", null, { 
					
			cache : null,
		
			constructor : function(options) {
				
				// TODO : This will be handled by a cache component. Currently set to bogus data
				this.cache = {
					1 : {
						bbox : [1,1,1,1],
						data : null
					}
				};
			},
						
			GetVectorLayerTiles : function(extent) {
				var indices = [1];	// TODO : Has to be calculated from extent and grid
			
				return Array.Map(indices, function(i) {
					return this.cache[i];
				}.bind(this));
			},
			
			GetVectorLayerTileData : function(tile) {
				var p1 = new Promise();
				
				if (!tile.data) {
					var min = Project.Point(tile.bbox[0], tile.bbox[1], "900913", 4326);
					var max = Project.Point(tile.bbox[2], tile.bbox[3], "900913", 4326);
					
					// TODO : WITH OVERPASS
					// var url = 'http://overpass-api.de/api/interpreter?data=[out:json][timeout:60];(way["building"]({0},{1},{2},{3});>;);out;'
					// var p2 = Ajax.Get(String.Format(url, [min.y, min.x, max.y, max.x]));
					
					// TODO : OSM DIRECTLY
					// extent = [min.x, min.y, max.x, max.y];
					// var p2 = OsmAuth.GetFeaturesInBBox(extent);
					
					// p2.then(OnSuccess, this.OnError.bind(this));
					
					// TODO : This is to use the sample json while developping
					OnSuccess(SampleJson);
				}
				
				else p1.Resolve(tile);
				
				function OnSuccess(data) {
					tile.data = data;
					p1.Resolve(tile);
				}
				
				return p1;
			}
		})
		
		return vectorLayerCache;
	})