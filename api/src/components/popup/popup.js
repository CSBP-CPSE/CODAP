
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/components/evented"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Evented) {

		var popup = Lang.Declare("Popup", [Evented], { 
		
			domNode : null,
			container : null,
			header : null,
			body : null,
			footer : null,
			
			fadedIn : false,
			
			constructor : function(options) {
				this.domNode = (!!options.domNode) ? options.domNode : Dom.Create("div");
				
				Dom.AddCss(this.domNode, "Popup");
				
				this.container = Dom.Create("div", { "className":"Container" }, this.domNode);
			
				this.header = Dom.Create("div", { "className":"Header" }, this.container);
				
				if (options.title) this.AddTitle(options.title);
				
				this.body = Dom.Create("div", { "className":"Body" }, this.container);
				
				this.footer = Dom.Create("div", { "className":"Footer" }, this.container);
				
				var btnClose1 = Dom.Create("button", { "className":"Button Close Icon" }, this.header);
				var btnClose2 = Dom.Create("button", { "className":"Button Close" }, this.footer);
			
				btnClose1.addEventListener("click", this.onBtnClose_Click.bind(this));
				btnClose2.addEventListener("click", this.onBtnClose_Click.bind(this));
				
				// TODO : This nls string comes from the app, should it be included in the API?? 
				btnClose2.innerHTML = Lang.Nls("Settings_Terms_Close");
				
				this.domNode.style.opacity = 0;
				this.domNode.style.visibility = 'hidden';
			},
			
			AddTitle : function(text) {
				Dom.Empty(this.header);
				
				var title = Dom.Create("h3", { "className":"Title" }, this.header);

				title.innerHTML = text;
			},
			
			FadeOut : function(instant) {
				if (!!instant) Animate.Remove(this.domNode, 'Fade');
				
				else Animate.Fade(this.domNode, false);
				
				this.emit("viewFadedOut");
				
				this.fadedIn = false;
			},
			
			FadeIn : function(instant) {
				if (!!instant) Animate.Remove(this.domNode, 'Fade');
				
				else Animate.Fade(this.domNode, true);
				
				this.emit("viewFadedIn");
				
				this.fadedIn = true;
			},
			
			IsFadedOut : function() {
				return !this.fadedIn;
			},
			
			IsFadedIn : function() {
				return this.fadedIn;
			},
			
			onBtnClose_Click : function(ev) {
				this.FadeOut();
			}
		})
		
		return popup;
	})