
r.define(["Api/util/lang",
		  "Exp/components/controller"],
    
	function (Lang,
			  Controller) {

		var mediator = Lang.Declare("Mediator", null, { 
			
			options : null,
		
			controllers : null,
			views : null,
		
			constructor : function(options, subs) {			
				this.controllers = {};
				this.views = {};
			},
			
			Controller : function(id) {
				return this.controllers[id] || null;
			},
			
			View : function(id) {
				return this.views[id] || null;
			},
			
			AddController : function(id, controller) {
				if (this.controllers[id]) throw new Error("A controller with id " + id + " already exists");
			
				controller.on("ControllerMessage", function(ev) { this.OnMessage(ev.message) }.bind(this));
				controller.on("ControllerError", function(ev) { this.OnError(ev.error) }.bind(this));
			
				this.controllers[id] = controller;
			},
			
			AddView : function(id, view) {
				if (this.views[id]) throw new Error("A view with id " + id + " already exists");
			
				this.views[id] = view;
			},
			
			NotifyViewNewModel : function(viewId, origin) {			
				this.Controller(viewId).NotifyViewNewModel("mediator");
			},
			
			OnError : function(error) {

			},
			
			OnMessage : function(message) {

			}
		})
		
		return mediator;
	})