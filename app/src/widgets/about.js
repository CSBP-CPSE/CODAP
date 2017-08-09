
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal"],
    
	function (Lang,
			  Dom,
			  ModalPopup) {

		var aboutPopup = Lang.Declare("AboutPopup", [ModalPopup], { 
			
			constructor : function() {
				Dom.AddCss(this.root, "About");	

				this.Build();
			},
			
			Build : function() {
				this.BuildLabel("h4", null, this.nodes.Body, Lang.Nls("Settings_About_Note2"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note3"));
				this.BuildLabel("h4", null, this.nodes.Body, Lang.Nls("Settings_About_Note4"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note5"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note6"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note7"));
				this.BuildLabel("h4", null, this.nodes.Body, Lang.Nls("Settings_About_Note8"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note9"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note10"));
				this.BuildLabel("h4", null, this.nodes.Body, Lang.Nls("Settings_About_Note11"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note12"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note13"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note14"));
				this.BuildLabel("p", null, this.nodes.Body, Lang.Nls("Settings_About_Note15"));
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
		
		return aboutPopup;
	})