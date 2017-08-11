
r.define(["Api/util/lang",
		  "App/components/mediator"],
    
	function (Lang,
			  Mediator) {

		var mediator = Lang.Declare("Mediator", [Mediator], { 

			aView : null,
		
			constructor : function(options, subs) {			

			},
			
			Startup : function() {
				this.Controller("Login").on("ControllerModelChange", this.onLoginController_ModelChange.bind(this));
				this.Controller("Map").on("ControllerModelChange", this.onMapController_ModelChange.bind(this));
				this.Controller("Main").on("ControllerModelChange", this.onMainController_ModelChange.bind(this));
				this.Controller("Settings").on("ControllerModelChange", this.onSettingsController_ModelChange.bind(this));
				this.Controller("POI").on("ControllerModelChange", this.onPOIController_ModelChange.bind(this));
				this.Controller("Building").on("ControllerModelChange", this.onBuildingController_ModelChange.bind(this));
				
				this.View("Ranking").on("collapsibleClicked", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("Settings").on("collapsibleClicked", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("POI").on("collapsibleClicked", this.onMainSubViewCollapsible_Click.bind(this));
				this.View("Building").on("collapsibleClicked", this.onMainSubViewCollapsible_Click.bind(this));
			},
			
			onMainSubViewCollapsible_Click : function(ev) {
				this.SetActiveView(null);
			},
			
			onLoginController_ModelChange : function(ev) {
				this.Controller("Settings").model.IsLogged = ev.model.IsLogged;
				this.Controller("Main").model.IsLogged = ev.model.IsLogged;
				
				this.View("Main").SetButtonState(ev.model.IsLogged);
			},
			
			onSettingsController_ModelChange : function(ev) {
				this.Controller("Login").model.IsLogged = ev.model.IsLogged;
				this.Controller("Main").model.IsLogged = ev.model.IsLogged;
				
				if (!ev.model.IsLogged) this.SetActiveView(null);
				
				this.View("Login").DoLogin();
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
				this.SetActiveView(ev.model.Active);
				
				if (ev.model.Active === "Geolocate") {
					this.SetActiveView(null);

					this.Controller("Map").model.Geolocating = true;
				 
					this.View("Map").DoGeolocate();
				}
			},
			
			SetActiveView : function(id) {
				var view = this.View(id);
				
				this.View("Main").SetActiveButton(id);
				
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