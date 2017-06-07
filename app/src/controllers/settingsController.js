
r.define(["Api/util/lang",
		  "Exp/util/osmAuth",
		  "Exp/components/controller"],
    
	function (Lang,
			  OsmAuth,
			  Controller) {

		var settingsController = Lang.Declare("SettingsController", [Controller], { 
		
			model : null,
		
			contact : null,
		
			constructor : function(options, subs) {	
				this.model = {
					IsLogged : false,
					Contact : options.contact
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