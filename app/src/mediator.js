
r.define(["Api/util/lang",
		  "Exp/components/mediator"],
    
	function (Lang,
			  Mediator) {

		var mediator = Lang.Declare("Mediator", [Mediator], { 

			aView : null,
		
			constructor : function(options, subs) {			

			},
			
			Startup : function() {
				this.Controller("Login").on("ControllerModelChange", this.onLoginController_ModelChange.bind(this));
				this.Controller("Main").on("ControllerModelChange", this.onMainController_ModelChange.bind(this));
				this.Controller("Map").on("ControllerModelChange", this.onMapController_ModelChange.bind(this));
				this.Controller("Settings").on("ControllerModelChange", this.onSettingsController_ModelChange.bind(this));
				this.Controller("Building").on("ControllerModelChange", this.onBuildingController_ModelChange.bind(this));
				
				this.View("Ranking").on("collapsibleClicked", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("Settings").on("collapsibleClicked", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("Building").on("collapsibleClicked", this.onMainSubViewCollapsible_Click.bind(this));
			},
			
			onMainSubViewCollapsible_Click : function(ev) {
				this.SetActiveView(null);
				
				this.Controller("Main").model.Active = null;
				
				this.NotifyViewNewModel("Main");
			},
			
			onLoginController_ModelChange : function(ev) {
				this.Controller("Main").model.IsLogged = ev.model.IsLogged;
				this.Controller("Main").model.Active = null;
				this.Controller("Settings").model.IsLogged = ev.model.IsLogged;
				
				if (ev.origin !== "Login") return;
				
				this.NotifyViewNewModel("Main");
				this.NotifyViewNewModel("Settings");
			},
			
			onSettingsController_ModelChange : function(ev) {
				this.Controller("Main").model.IsLogged = ev.model.IsLogged;	
				this.Controller("Login").model.IsLogged = ev.model.IsLogged;
				
				if (!ev.model.IsLogged) {
					this.Controller("Main").model.Active = null;		
				}
				
				if (ev.origin !== "Settings") return;
				
				this.NotifyViewNewModel("Main");
				this.NotifyViewNewModel("Login");
			},
			
			onMapController_ModelChange : function(ev) {
				this.Controller("Building").model.Selected = ev.model.Selected;
				
				if (ev.model.Selected) this.Controller("Main").model.Active = "Building";
				
				if (ev.origin !== "Map") return;
				
				this.NotifyViewNewModel("Main");
				this.NotifyViewNewModel("Building");
			},
			
			onBuildingController_ModelChange : function(ev) {
				this.Controller("Map").model.Selected = ev.model.Selected;
				
				if (!ev.model.Selected) this.Controller("Main").model.Active = null;
				
				if (ev.origin !== "Building") return;
				
				this.NotifyViewNewModel("Main");
				this.NotifyViewNewModel("Map");
			},
			
			onMainController_ModelChange : function(ev) {
				if (ev.model.Active === "Ranking") this.SetActiveView(this.View("Ranking"));
				
				else if (ev.model.Active === "Settings") this.SetActiveView(this.View("Settings"));
				
				else if (ev.model.Active === "Building") this.SetActiveView(this.View("Building"));
				
				else if (ev.model.Active === "Geolocate") {
					this.SetActiveView(null);

					this.Controller("Map").model.Geolocating = true;
				
					if (ev.origin !== "Main") return;
				
					this.NotifyViewNewModel("Map");
				}
				
				else this.SetActiveView(null);
			},
			
			SetActiveView : function(view) {
				if (this.aView === view) return;
				
				if (this.aView && this.aView.IsExpanded()) this.aView.Collapse(view !== null);
				
				this.aView = view;
				
				if (this.aView && this.aView.IsCollapsed()) this.aView.Expand();
			},
			
			OnError : function(error) {
				alert(error.message);
			},
			
			OnMessage : function(message) {
				alert(message);
			}
		})
		
		return mediator;
	})