
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal"],
    
	function (Lang,
			  Dom,
			  ModalPopup) {

		var unavailablePopup = Lang.Declare("UnavailablePopup", [ModalPopup], { 
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Unavailable");	

				this.Build();
			},
			
			Build : function() {
				this.BuildLabel("p", null, this.body, Lang.Nls("Settings_Unavailable_Note2"));
			},
			
			BuildLabel : function(type, className, pNode, innerHTML) {		
				var opts = (!!className) ? { className : className } : null;
			
				var label = Dom.Create(type, opts, pNode);
				
				label.innerHTML = innerHTML;
				
				return label;
			},
			
			BuildLink : function(className, nls) {			
				var link = Dom.Create("a", { "className" : "Link " + className });
				Dom.Place(link, this.domNode)
				link.innerHTML = Lang.Nls(nls);
				
				return link;
			}
		})
		
		return unavailablePopup;
	})