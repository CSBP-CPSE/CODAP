
r.define(["Api/util/lang",
		  "App/components/controller"],
    
	function (Lang,
			  Controller) {

		var mainController = Lang.Declare("MainController", [Controller], { 
		
			model : null,
		
			options : null,
		
			constructor : function(options) {	
				// Default model
				this.model = {
					IsLogged : false,
					Active   : null
				}		
			},
			
			SetActive : function(active) {
				this.model.Active = active;
				
				this.NotifyViewNewModel("Main");
			}
		})
		
		return mainController;
	})