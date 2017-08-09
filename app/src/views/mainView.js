
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/util/animate",
		  "Exp/components/views/view"],
    
	function (Lang,
			  Dom,
			  Array,
			  Animate,
			  View) {

		var mainView = Lang.Declare("MainView", [View], { 
			
			Menu :null,
			
			activeButton : null,
			
			constructor : function(options, subs) {	
				this.subs = subs;
				
				Dom.AddCss(this.domNode, "Main");	

				this.activeButton = null;
				
				this.BuildMenu();		
			},
			
			BuildMenu : function() {
				this.Menu = {};
				this.Menu.Top = Dom.Create("div", { "className":"Menu" }, this.domNode);
				
				this.Menu.Buttons = {};
				this.Menu.Buttons.Top = Dom.Create("div", { "className":"Buttons" }, this.Menu.Top);
				this.Menu.Buttons.Geolocate = Dom.Create("button", { "className":"Geolocate" }, this.Menu.Buttons.Top);
				this.Menu.Buttons.POI = Dom.Create("button", { "className":"POI" }, this.Menu.Buttons.Top);
				this.Menu.Buttons.Building = Dom.Create("button", { "className":"Building" }, this.Menu.Buttons.Top);
				this.Menu.Buttons.Ranking = Dom.Create("button", { "className":"Ranking" }, this.Menu.Buttons.Top);
				this.Menu.Buttons.Settings = Dom.Create("button", { "className":"Settings" }, this.Menu.Buttons.Top);
				
				this.Menu.Buttons.Geolocate.addEventListener("click", this.BtnGeolocate_OnClick.bind(this), false);
				this.Menu.Buttons.POI.addEventListener("click", this.BtnPOI_OnClick.bind(this), false);
				this.Menu.Buttons.Building.addEventListener("click", this.BtnBuilding_OnClick.bind(this), false);
				this.Menu.Buttons.Ranking.addEventListener("click", this.BtnRanking_OnClick.bind(this), false);
				this.Menu.Buttons.Settings.addEventListener("click", this.BtnSettings_OnClick.bind(this), false);
				
				this.SetButtonState(false);
			},
			
			onController_ModelChange : function(ev) {
				this.SetButtonState(ev.model.IsLogged);
				
				if (ev.model.Active == "Ranking") this.SetActiveButton(this.Menu.Buttons.Ranking);
				
				else if (ev.model.Active == "Settings") this.SetActiveButton(this.Menu.Buttons.Settings);
				
				else if (ev.model.Active == "Building") this.SetActiveButton(this.Menu.Buttons.Building);
				
				else if (ev.model.Active == "POI") this.SetActiveButton(this.Menu.Buttons.POI);
				
				else this.SetActiveButton(null);
			},
			
			SetButtonState : function(enabled) {
				this.Menu.Buttons.Geolocate.disabled = !enabled;
				this.Menu.Buttons.Ranking.disabled = !enabled;
				this.Menu.Buttons.Settings.disabled = !enabled;
				this.Menu.Buttons.Building.disabled = !enabled;
				this.Menu.Buttons.POI.disabled = !enabled;
			},
			
			SetActiveButton : function(button) {
				if (this.activeButton) Dom.RemoveCss(this.activeButton, "Active");
			
				this.activeButton = button;
				
				if (this.activeButton) Dom.AddCss(this.activeButton, "Active");
			},
			
			BtnGeolocate_OnClick : function(e) { 
				this.controller.SetActive("Geolocate");			
			},
			
			BtnRanking_OnClick : function(e) {				
				this.controller.SetActive((e.target !== this.activeButton) ? "Ranking" : null);
			},
			
			BtnPOI_OnClick : function(e) {
				this.controller.SetActive((e.target !== this.activeButton) ? "POI" : null);
			},
			
			BtnBuilding_OnClick : function(e) { 
				this.controller.SetActive((e.target !== this.activeButton) ? "Building" : null);
			},
			
			BtnSettings_OnClick : function(e) { 
				this.controller.SetActive((e.target !== this.activeButton) ? "Settings" : null);
			}
		})
		
		return mainView;
	})