
r.define(["Api/util/lang",
		  "Exp/components/controller"],
    
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
			
			Geolocate : function() {
				if (!navigator.geolocation) this.NotifyViewError(new Error("Geolocation is not supported by this browser."));
				
				else navigator.geolocation.getCurrentPosition(success.bind(this), this.NotifyViewError.bind(this));
				
				function success(ev) {
					this.subs.map.ZoomToXY(ev.coords.longitude, ev.coord.latitude, "4326");
				}
			},
			
			SetActive : function(active) {
				this.model.Active = active;
				
				this.NotifyViewNewModel("Main");
			}
		})
		
		return mainController;
	})