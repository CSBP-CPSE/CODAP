
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal"],
    
	function (Lang,
			  Dom,
			  ModalPopup) {

		var termsPopup = Lang.Declare("TermsPopup", [ModalPopup], { 
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Terms");	

				this.Build();
			},
			
			Build : function() {
				this.BuildLabel("p", null, this.body, Lang.Nls("Settings_Terms_Note2"));
				this.BuildLabel("h4", null, this.body, Lang.Nls("Settings_Terms_Note3"));
				this.BuildLabel("p", null, this.body, Lang.Nls("Settings_Terms_Note4"));
				this.BuildLabel("h4", null, this.body, Lang.Nls("Settings_Terms_Note5"));
				this.BuildLabel("p", null, this.body, Lang.Nls("Settings_Terms_Note6"));
				this.BuildLabel("p", null, this.body, Lang.Nls("Settings_Terms_Note7"));
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
		
		return termsPopup;
	})