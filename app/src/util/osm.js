r.define(["Api/util/array",
		  "Api/util/lang",
		  "Api/util/ajax",
		  "App/widgets/info/amenity", 
		  "App/widgets/info/shop", 
		  "App/widgets/info/building"],

	function (Array,
			  Lang,
			  Ajax,
			  Amenity,
			  Shop,
			  Building) {
		
		var categories = [{
				Id : "amenity",
				InfoClass : Amenity,
				Type : "POI",
				Label : function(f) { return f.getProperties().tags["name"] }
			}, {
				Id : "shop",
				InfoClass : Shop,
				Type : "POI",
				Label : function(f) { return f.getProperties().tags["name"] }
			}, {
				Id : "building",
				InfoClass : Building,
				Type : "Polygon",
				Label : function(f) { 
					addr = [];
					
					if (OsmH.Tag(f, "addr:housenumber")) addr.push(OsmH.Tag(f, "addr:housenumber"));
					if (OsmH.Tag(f, "addr:street")) addr.push(OsmH.Tag(f, "addr:street"));
					if (OsmH.Tag(f, "addr:city")) addr.push(OsmH.Tag(f, "addr:city"));
					
					return addr.join(", ");
				}
			}
		];
		
		var OsmH = {
			Categories : categories,
			
			Index : Array.Index(categories, function(cat) { return cat.Id; }),
			
			Tag : function(f, tag) {				
				var tags = f.getProperties()["tags"];
				
				if (!tags) return null;
				
				return tags[tag] || null;
			},

			Category : function(f) {
				for (var id in this.Index) {
					if (this.Tag(f, id)) return this.Index[id];
				}
				
				return null;
			}
		}
		
		return OsmH; 
	});