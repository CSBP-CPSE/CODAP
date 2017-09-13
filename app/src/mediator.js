
r.define(["Api/util/lang",
		  "App/components/mediator"],
    
	function (Lang,
			  Mediator) {

		var mediator = Lang.Declare("Mediator", [Mediator], { 

			aViewId : null,
		
			constructor : function(options, subs) {			

			},
			
			Startup : function() {
				this.Controller("Login").on("ControllerModelChange", this.onLoginController_ModelChange.bind(this));
				this.Controller("Map").on("ControllerModelChange", this.onMapController_ModelChange.bind(this));
				this.Controller("Main").on("ControllerModelChange", this.onMainController_ModelChange.bind(this));
				this.Controller("Settings").on("ControllerModelChange", this.onSettingsController_ModelChange.bind(this));
				this.Controller("POI").on("ControllerModelChange", this.onPOIController_ModelChange.bind(this));
				this.Controller("Building").on("ControllerModelChange", this.onBuildingController_ModelChange.bind(this));
				
				// collapsibleClicked
				
				this.View("Ranking").on("viewCollapsed", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("Settings").on("viewCollapsed", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("POI").on("viewCollapsed", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("Building").on("viewCollapsed", this.onMainSubViewCollapsible_Click.bind(this));
			},
			
			onMainSubViewCollapsible_Click : function(ev) {
				this.CloseView(false);
			},
			
			onLoginController_ModelChange : function(ev) {
				this.Controller("Settings").model.IsLogged = ev.model.IsLogged;
				this.Controller("Main").model.IsLogged = ev.model.IsLogged;
				
				this.View("Main").SetButtonState(ev.model.IsLogged);
			},
			
			onSettingsController_ModelChange : function(ev) {
				this.Controller("Login").model.IsLogged = ev.model.IsLogged;
				this.Controller("Main").model.IsLogged = ev.model.IsLogged;
				
				if (!ev.model.IsLogged) this.View("Login").DoLogin();
			},
			
			onMapController_ModelChange : function(ev) {				
				if (ev.origin !== "Map") return;
				
				if (ev.model.Mode === "POI") {
					this.Controller("POI").model.POI = ev.model.Selected;
					this.SetActiveView("POI");
					this.View("POI").ShowPOI();
				}
				
				if (ev.model.Mode === "Building") {
					this.Controller("Building").model.Building = ev.model.Selected;
					this.SetActiveView("Building");
					this.View("Building").ShowBuilding();
				}
			},
			
			onPOIController_ModelChange : function(ev) {
				if (ev.origin !== "POI") return;
				
				if (ev.model.Active) this.Controller("Map").model.Mode = "POI";
				
				if (!ev.model.POI) this.Controller("Map").ClearMap();
			},
			
			onBuildingController_ModelChange : function(ev) {
				if (ev.origin !== "Building") return;
				
				if (ev.model.Active) this.Controller("Map").model.Mode = "Building";
				
				if (!ev.model.Building) this.Controller("Map").ClearMap();
			},
			
			onMainController_ModelChange : function(ev) {

				if (ev.model.Active === "Geolocate") {
					this.CloseView(false);

					this.Controller("Map").model.Geolocating = true;
				 
					this.View("Map").DoGeolocate();
				}
				else this.SetActiveView(ev.model.Active);
			},
			
			OpenView : function(id) {
				this.aViewId = id;
				
				if (!!this.aViewId && this.ActiveView().IsCollapsed()) this.ActiveView().Expand();
				
				this.View("Main").SetActiveButton(id);
			},
			
			CloseView : function(instant) {
				if (!this.aViewId) return;
				
				if (this.ActiveView().IsExpanded()) this.ActiveView().Collapse(instant);
				
				this.aViewId = null;
				
				this.View("Main").SetActiveButton(null);
			},
			
			SetActiveView : function(id) {
				if (this.aViewId === id) return;
				
				this.CloseView(id !== null);
				this.OpenView(id);
			},
			
			OnError : function(error) {
				alert(error.message);
			},
			
			OnMessage : function(message) {
				alert(message);
			},
			
			ActiveView : function() {
				return this.View(this.aViewId);
			}
		})
		
		return mediator;
	})