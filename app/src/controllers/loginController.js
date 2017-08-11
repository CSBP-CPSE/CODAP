
r.define(["Api/util/lang",
		  "App/util/osmAuth",
		  "App/components/controller"],
    
	function (Lang,
			  OsmAuth,
			  Controller) {

		var loginController = Lang.Declare("LoginController", [Controller], { 
		
			model : null,
			options : null,
		
			constructor : function(options) {
				this.options = {
					oAuth : options.oAuth
				}
				
				this.model = {
					IsLogged : false,
					Details  : null
				}
			
				OsmAuth.Initialize(this.options.oAuth);
			},
			
			Login : function() {
				var p = OsmAuth.Authenticate();
				
				p.then(function(ev) { this.UpdateModel(); }.bind(this));
				
				return p;
			},
			
			Logout : function() {
				OsmAuth.Logout();

				this.UpdateModel();
			},
			
			IsLogged : function() {
				return OsmAuth.IsAuthenticated();
			},
			
			UpdateModel : function() {	
				if (this.IsLogged()) OsmAuth.GetUserDetails().then(success.bind(this), failure.bind(this));
			
				else success.apply(this, null);
			
				function success(details) {
					this.model.IsLogged = this.IsLogged();
					this.model.Details = details || null;
					
					this.NotifyViewNewModel("Login");
				}
				
				function failure(error) {
					if (error.status == 401) {
						OsmAuth.Logout();
						success.apply(this, null);
					}
					
					else this.NotifyViewError(error);
				}
			}
		})
		
		return loginController;
	})