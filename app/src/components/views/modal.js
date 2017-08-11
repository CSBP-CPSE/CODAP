
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "App/components/views/view"],
    
	function (Lang,
			  Dom,
			  Animate,
			  View) {

		var view = Lang.Declare("ModalView", [View], { 
		
			domNode : null,
			controller : null,
			
			fadedIn : false,
			
			constructor : function(options) {
				Dom.AddCss(this.domNode, "Modal");
				
				this.domNode.style.opacity = 0;
				this.domNode.style.visibility = 'hidden';
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
			}
		})
		
		return view;
	})