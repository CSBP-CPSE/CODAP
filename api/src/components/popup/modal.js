
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/popup"],
    
	function (Lang,
			  Dom,
			  Popup) {

		var modalPopup = Lang.Declare("ModalPopup", [Popup], { 
		
			domNode : null,
			
			constructor : function(options) {
				 Dom.AddCss(this.domNode, "Modal");
			}
		})
		
		return modalPopup;
	})