
r.define(["Api/util/lang",
		  "Exp/components/controller"],
    
	function (Lang,
			  Controller) {

		var buildingController = Lang.Declare("BuildingController", [Controller], { 
		
			model : null,
		
			options : null,
		
			constructor : function(options, subs) {			
				this.model = {
					Selected : null
				};
			},
			
			Clear: function() {
				this.model.Selected = null;
				this.NotifyViewNewModel("Building");
			},
			
			GetTag : function(key) {
				var f = this.model.Selected;
				
				return f.getProperties()["tags"][key] || "";
			},
			
			HasTag : function(key) {
				var f = this.model.Selected;
				
				return f.getProperties()["tags"].hasOwnProperty(key);
			},
			
			GetAddress : function() {
				addr = [];
				
				if (this.HasTag("addr:housenumber")) addr.push(this.GetTag("addr:housenumber"));
				if (this.HasTag("addr:street")) addr.push(this.GetTag("addr:street"));
				if (this.HasTag("addr:city")) addr.push(this.GetTag("addr:city"));
				
				return addr.join(", ");
			}
		})
		
		return buildingController;
	})