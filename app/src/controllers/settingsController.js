
r.define(["Api/util/lang",
		  "Exp/util/osmAuth",
		  "Exp/components/controller"],
    
	function (Lang,
			  OsmAuth,
			  Controller) {

		var settingsController = Lang.Declare("SettingsController", [Controller], { 
		
			model : null,
		
			options : null,
		
			constructor : function(options, subs) {	
				this.model = {
					IsLogged : false
				};
			},
			
			Logout : function() {
				OsmAuth.Logout();
				this.model.IsLogged = false;

				this.NotifyViewNewModel("Settings");
			}
		})
		
		return settingsController;
	})