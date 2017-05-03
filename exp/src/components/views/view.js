
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/evented"],
    
	function (Lang,
			  Dom,
			  Evented) {

		var view = Lang.Declare("View", [Evented], { 
		
			domNode : null,
			controller : null,
		
			set : function(prop, value) {
				if (prop == "controller") {
					this.controller = value;
					this.controller.on("ControllerModelChange", this.onController_ModelChange.bind(this));
					this.controller.on("ControllerMessage", this.onController_Message.bind(this));
					this.controller.on("ControllerError", this.onController_Error.bind(this));
				}
				
				else this[prop] = value;
			},
		
			constructor : function(options) {
				// TODO : Validate that it has a controller
				this.domNode = (!!options.domNode) ? options.domNode : Dom.Create("div");
				
				Dom.AddCss(this.domNode, "View");
				
				if (options.controller) this.set("controller", options.controller);	
			},
			
			onController_ModelChange : function(model) {
				
			},
			
			onController_Error : function(error) {
				
			},
			
			onController_Message : function(message) {
				
			}
		})
		
		return view;
	})