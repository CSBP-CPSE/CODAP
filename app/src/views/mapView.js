
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
				
				this.controller.map.on("click", this.onMap_Click.bind(this));
			},
			
			onMap_Click : function(ev) {
				this.controller.AddSearchFeature(ev.coordinate);
				
				var p = this.controller.IdentifyFeatures(ev.coordinate);
				
				p.then(this.onMap_FeaturesIdentified.bind(this));
			},
			
			onMap_FeaturesIdentified : function(ev) {
				this.controller.SelectFeature(ev.feature);
			},
			
			onController_ModelChange : function(ev) {
				this.controller.ClearMap();
				
				if (ev.model.Selected) this.controller.AddFeature(ev.model.Selected);
				
				if (ev.model.Geolocating) this.controller.Geolocate();
			}
		})
		
		return mapView;
	})