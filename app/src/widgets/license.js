
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal"],
    
	function (Lang,
			  Dom,
			  ModalPopup) {

		var licensePopup = Lang.Declare("LicensePopup", [ModalPopup], { 
			
			constructor : function() {
				Dom.AddCss(this.root, "License");	

				this.Build();
			},
			
			Build : function() {
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_License_Note2"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_License_Note3"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_License_Note4"));
				this.BuildLabel("h3", null, this.nodes.Body, Lang.Nls("Settings_License_Note5"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_License_Note6"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_License_Note7"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_License_Note8"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_License_Note9"));
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
		
		return licensePopup;
	})