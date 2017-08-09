
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Exp/components/views/view"],
    
	function (Lang,
			  Dom,
			  View) {

		var mapView = Lang.Declare("MapView", [View], { 
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Map");
				
				this.controller.map.setTarget(this.domNode);
			},
			
			onController_ModelChange : function(ev) {
				this.controller.ClearMap();
				
				if (ev.model.Building) this.controller.AddFeature(ev.model.Building);
				
				if (ev.model.POI) this.controller.AddFeature(ev.model.POI);
				
				if (ev.model.Geolocating) this.controller.Geolocate();
			}
		})
		
		return mapView;
	})