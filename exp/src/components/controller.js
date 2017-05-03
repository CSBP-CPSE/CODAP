
r.define(["Api/util/lang",
		  "Api/components/evented"],
    
	function (Lang,
			  Evented) {

		var controller = Lang.Declare("Controller", [Evented], { 
		
			model : null,
		
			constructor : function() {

			},
			
			UpdateModel : function() {
				this.NotifyViewNewModel();
			},
			
			NotifyViewNewModel : function(origin) {				
				this.emit("ControllerModelChange", { model:this.model, origin:origin || null });
			},
			
			NotifyViewError : function(err) {
				this.emit("ControllerError", { error: err });
			},
			
			NotifyViewMessage : function(message) {
				this.emit("ControllerMessage", { message: message });
			}
		})
		
		return controller;
	})