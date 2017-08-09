
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal"],
    
	function (Lang,
			  Dom,
			  ModalPopup) {

		var tutorialPopup = Lang.Declare("TutorialPopup", [ModalPopup], { 
			
			constructor : function() {
				Dom.AddCss(this.root, "Tutorial");	

				this.Build();
			},
			
			Build : function() {
				var row = Dom.Create("div", { "className":"Row" }, this.nodes.Body);
				this.BuildLabel("p", "Note Left", row, Lang.Nls("Settings_Tutorial_Note2"));
				Dom.Create("div", { "className":"Image One" }, row);
				
				var row = Dom.Create("div", { "className":"Row" }, this.nodes.Body);
				Dom.Create("div", { "className":"Image Two" }, row);
				this.BuildLabel("p", "Note Right", row, Lang.Nls("Settings_Tutorial_Note3"));
				
				var row = Dom.Create("div", { "className":"Row" }, this.nodes.Body);
				this.BuildLabel("p", "Note Left", row, Lang.Nls("Settings_Tutorial_Note4"));
				Dom.Create("div", { "className":"Image Three" }, row);
				
				var row = Dom.Create("div", { "className":"Row" }, this.nodes.Body);
				Dom.Create("div", { "className":"Image Four" }, row);
				this.BuildLabel("p", "Note Right", row, Lang.Nls("Settings_Tutorial_Note5"));
				
				var row = Dom.Create("div", { "className":"Row" }, this.nodes.Body);
				this.BuildLabel("p", "Note Full", row, Lang.Nls("Settings_Tutorial_Note6"));
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
		
		return tutorialPopup;
	})