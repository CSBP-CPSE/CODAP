
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/components/Evented"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Evented) {

		var view = Lang.Declare("View", [Evented], { 
		
			domNode : null,
			controller : null,
		
			expanded : false,
		
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

				if (options.collapsible) this.BuildCollapsible(options.collapsible);
			},
			
			Collapse : function(instant) {
				if (!!instant) Animate.Remove(this.domNode, 'WipeV');
				
				else Animate.WipeV(this.domNode, false);
				
				this.emit("viewCollapsed");
				
				this.expanded = false;
			},
			
			Expand : function(instant) {
				if (!!instant) Animate.Remove(this.domNode, 'WipeV');
				
				else Animate.WipeV(this.domNode, true);
				
				this.emit("viewExpanded");
				
				this.expanded = true;
			},
			
			IsCollapsed : function() {
				return !this.expanded;
			},
			
			IsExpanded : function() {
				return this.expanded;
			},
			
			BuildCollapsible : function(collapsible) {
				var cnt = Dom.Create("div", { "className":"ArrowContainer" }, this.domNode);
				var arr = Dom.Create("button", { "className":"Arrow " + collapsible}, cnt);
				
				arr.addEventListener("click", this.onCollapsibleClicked.bind(this));
			},
			
			onCollapsibleClicked : function() {
				this.Collapse(false);
				this.emit("collapsibleClicked");
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