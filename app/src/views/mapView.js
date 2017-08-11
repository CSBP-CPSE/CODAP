
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "App/components/views/view"],
    
	function (Lang,
			  Dom,
			  View) {

		var mapView = Lang.Declare("MapView", [View], { 
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Map");
				
				this.controller.map.setTarget(this.domNode);
			},
			
			DoGeolocate : function() {
				if (this.controller.model.Geolocating) this.controller.Geolocate();
			},
			
			onController_ModelChange : function(ev) {			
				this.DoGeolocate();
			}
		})
		
		return mapView;
	})