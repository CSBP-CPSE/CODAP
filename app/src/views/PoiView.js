
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Exp/components/views/collapsible"],
    
	function (Lang,
			  Dom,
			  CollapsibleView) {

		var POIView = Lang.Declare("POIView", [CollapsibleView], { 
								
			constructor : function() {
				Dom.AddCss(this.domNode, "POI");	

				this.BuildPOI();
			},
			
			BuildPOI : function() {
				this.POI = {};
			}
		})
		
		return POIView;
	})