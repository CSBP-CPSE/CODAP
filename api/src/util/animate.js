
r.define(["Api/util/dom"],

	function (Dom) {

	    return { 
		
			_anims : {
				Visibility 	: ["fadeIn", "fadeOut"],
				WipeV		: ["wipeInV", "wipeOutV"]
			},
		
            Fade : function(node, isVisible) {
				var anims = this._anims.Visibility;
			
				var css1 = isVisible ?  anims[1] :  anims[0];
				var css2 = isVisible ? anims[0] : anims[1];
				
				Dom.ToggleCss(node, css1, css2); 
			},
		
            WipeV : function(node, isVisible) {
				var anims = this._anims.WipeV;
				
				var css1 = isVisible ?  anims[1] :  anims[0];
				var css2 = isVisible ? anims[0] : anims[1];
				
				Dom.ToggleCss(node, css1, css2); 
			},
			
			Remove : function(node, animation) {
				var anims = this._anims[animation];
				
				Dom.RemoveCss(node, anims[0]);
				Dom.RemoveCss(node, anims[1]);
			}
		}
	})