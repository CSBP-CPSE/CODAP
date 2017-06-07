r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/plugins/json!App/config/app", 
		  "Api/plugins/json!App/config/nls", 
		  "App/mediator",
		  "App/views/mainView",
		  "App/views/mapView",
		  "App/views/loginView",
		  "App/views/buildingView",
		  "App/views/rankingView",
		  "App/views/settingsView",
		  "App/controllers/mainController",
		  "App/controllers/mapController",
		  "App/controllers/loginController",
		  "App/controllers/buildingController",
		  "App/controllers/rankingController",
		  "App/controllers/settingsController"],

    function (Lang,
			  Dom,
			  Array,
			  AppJson,
			  NlsJson,
			  Mediator,
			  MainView,
			  MapView,
			  LoginView,
			  BuildingView,
			  RankingView,
			  SettingsView,
			  MainController,
			  MapController,
			  LoginController,
			  BuildingController,
			  RankingController,
			  SettingsController) {
	
        return {
			
			Start : function() {
				var locale = location.search.match(new RegExp("locale=([\\w\\-]+)")) ? RegExp.$1.replace(/%22/g, "\"").replace(/%20/g, "") : "en";

				Lang.set('locale', locale);
				Lang.set('nls', NlsJson);
				
				var mediator = new Mediator();
				
				mediator.AddController("Map", new MapController(AppJson));
				mediator.AddController("Login", new LoginController(AppJson));
				mediator.AddController("Building", new BuildingController(AppJson));
				mediator.AddController("Ranking", new RankingController(AppJson));
				mediator.AddController("Settings", new SettingsController(AppJson));
				mediator.AddController("Main", new MainController(AppJson));

				mediator.AddView("Map", new MapView({ 
					domNode 	: Dom.Create("div", null, document.body), 
					controller 	: mediator.Controller("Map")
				}));
				
				mediator.AddView("Login", new LoginView({ 
					domNode 	: Dom.Create("div", null, document.body), 
					controller 	: mediator.Controller("Login")
				}));
				
				mediator.AddView("Building", new BuildingView({
					domNode 	: Dom.Create("div", null, document.body), 
					controller  : mediator.Controller("Building"),
					collapsible : "Down"
				}));
				
				mediator.AddView("Ranking", new RankingView({
					domNode 	: Dom.Create("div", null, document.body), 
					controller  : mediator.Controller("Ranking"),
					collapsible : "Down"
				}));
				
				mediator.AddView("Settings", new SettingsView({
					domNode 	: Dom.Create("div", null, document.body), 
					controller  : mediator.Controller("Settings"),
					collapsible : "Down"
				}));
				
				mediator.AddView("Main", new MainView({ 
					domNode 	: Dom.Create("div", null, document.body), 
					controller  : mediator.Controller("Main")
				}));
				
				mediator.Startup();
				
				Array.ForEach(mediator.views, function(view) { view.controller.UpdateModel(); });
			}
		}
	});