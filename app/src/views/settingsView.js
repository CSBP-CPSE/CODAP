
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal",
		  "Exp/components/views/collapsible",
		  "App/widgets/about",
		  "App/widgets/terms",
		  "App/widgets/license",
		  "App/widgets/tutorial",
		  "App/widgets/unavailable"],
    
	function (Lang,
			  Dom,
			  ModalPopup,
			  CollapsibleView,
			  AboutWidget,
			  TermsWidget,
			  LicenseWidget,
			  TutorialWidget,
			  UnavailableWidget) {

		var settingsView = Lang.Declare("SettingsView", [CollapsibleView], { 
				
			Settings :null,
			
			popups : null,
		
			constructor : function() {
				Dom.AddCss(this.domNode, "Settings");	

				this.popups = {};
				
				var domNode = Dom.Create("div", { className:"About" }, document.body);
				
				this.popups.About = new AboutWidget(domNode, { title:Lang.Nls("Settings_About_Note1") });
				
				var domNode = Dom.Create("div", { className:"Terms" }, document.body);
				
				this.popups.Terms = new TermsWidget(domNode, { title:Lang.Nls("Settings_Terms_Note1") });
				
				var domNode = Dom.Create("div", { className:"License" }, document.body);
				
				this.popups.License = new LicenseWidget(domNode, { title:Lang.Nls("Settings_License_Note1") });
				
				var domNode = Dom.Create("div", { className:"Tutorial" }, document.body);
				
				this.popups.Tutorial = new TutorialWidget(domNode, { title:Lang.Nls("Settings_Tutorial_Note1") });
				
				var domNode = Dom.Create("div", { className:"Unavailable" }, document.body);
				
				this.popups.Unavailable = new UnavailableWidget(domNode, { title:Lang.Nls("Settings_Unavailable_Note1") });
				
				this.BuildSettings();
			},
			
			BuildSettings : function() {
				this.Settings = {};
				
				this.Settings.Title = Dom.Create("div", { "className":"Title" });
				this.Settings.Title.innerHTML = Lang.Nls("Settings_Title");
				
				this.Settings.BtnLogout = Dom.Create("button", { "className" : "Button Logout" });
				this.Settings.BtnLogout.innerHTML = Lang.Nls("Settings_BtnLogout");
				this.Settings.BtnLogout.addEventListener("click", this.onBtnLogout_Click.bind(this));
				
				Dom.Place(this.Settings.Title, this.domNode);
				Dom.Place(this.Settings.BtnLogout, this.domNode);
				
				this.Settings.LnkAbout = this.BuildLink("about", "Settings_LnkAbout");
				this.Settings.LnkAbout.addEventListener("click", this.onLnkPopup_Click.bind(this, this.popups.About));
				
				this.Settings.LnkTerms = this.BuildLink("about", "Settings_LnkTerms");
				this.Settings.LnkTerms.addEventListener("click", this.onLnkPopup_Click.bind(this, this.popups.Terms));
				
				this.Settings.LnkLicense = this.BuildLink("about", "Settings_LnkLicense");
				this.Settings.LnkLicense.addEventListener("click", this.onLnkPopup_Click.bind(this, this.popups.License));
				
				this.Settings.LnkTutorial = this.BuildLink("tutorial", "Settings_LnkTutorial");
				this.Settings.LnkTutorial.addEventListener("click", this.onLnkPopup_Click.bind(this, this.popups.Tutorial));
				
				this.Settings.LnkLanguage = this.BuildLink("language", "Settings_LnkLanguage");
				this.Settings.LnkLanguage.addEventListener("click", this.onBtnLanguage_Click.bind(this));
				
				this.Settings.LnkContact = this.BuildLink("contact", "Settings_LnkContact");
				this.Settings.LnkContact.href = "mailto:" + this.controller.model.Contact + "?subject=" + Lang.Nls("Settings_Subject_Comment");
			},
			
			BuildLabel : function(type, className, pNode, innerHTML) {		
				var opts = (!!className) ? { className : className } : null;
			
				var label = Dom.Create(type, opts, pNode);
				
				label.innerHTML = innerHTML;
				
				return label;
			},
			
			BuildLink : function(className, nls) {			
				var link = Dom.Create("a", { "className" : "Link " + className });
				Dom.Place(link, this.domNode)
				link.innerHTML = Lang.Nls(nls);
				
				return link;
			},
			
			onBtnLanguage_Click : function(e) {
				var lang = (Lang.locale == "en") ? "fr" : "en" ;
				
				window.open(location.origin + location.pathname + "?locale=" + lang, "_self");
			},
			
			onLnkPopup_Click : function(popup, ev) {
				popup.FadeIn();
			},
			
			onBtnLogout_Click : function(ev) {
				this.controller.Logout();
				this.Collapse();
			}
		})
		
		return settingsView;
	})