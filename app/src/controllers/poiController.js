
r.define(["Api/util/lang",
		  "Exp/components/controller"],
    
	function (Lang,
			  Controller) {

		var POIController = Lang.Declare("POIController", [Controller], { 
		
			model : null,
		
			options : null,
		
			constructor : function(options, subs) {			
				this.model = {};
			},
			
			Clear: function() {
				this.model.POI = null;
				this.NotifyViewNewModel("POI");
			},
			
			GetTag : function(key) {
				var f = this.model.POI;
				
				return f.getProperties()["tags"][key] || "";
			},
			
			HasTag : function(key) {
				var f = this.model.POI;
				
				return f.getProperties()["tags"].hasOwnProperty(key);
			},
			
			GetAddress : function() {
				addr = [];
				
				if (this.HasTag("addr:housenumber")) addr.push(this.GetTag("addr:housenumber"));
				if (this.HasTag("addr:street")) addr.push(this.GetTag("addr:street"));
				if (this.HasTag("addr:city")) addr.push(this.GetTag("addr:city"));
				
				return addr.join(", ");
			},
			
			GetLabel : function() {
				if (this.HasTag("amenity")) return this.GetTag("amenity");
				
				if (this.HasTag("shop")) return this.GetTag("name");
			}
		})
		
		return POIController;
	})