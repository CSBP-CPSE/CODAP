
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/components/popup/modal",
		  "Exp/components/views/collapsible"],
    
	function (Lang,
			  Dom,
			  ModalPopup,
			  CollapsibleView) {

		var settingsView = Lang.Declare("SettingsView", [CollapsibleView], { 
				
			Settings :null,
			
			popups : null,
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Settings");	

				this.popups = {};
				this.popups.About = this.BuildAboutPopup();
				this.popups.Terms = this.BuildTermsPopup();
				this.popups.License = this.BuildLicensePopup();
				this.popups.Unavailable = this.BuildUnavailablePopup();
				
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
				
				this.Settings.LnkTutorial = this.BuildLink("disabled tutorial", "Settings_LnkTutorial");
				this.Settings.LnkTutorial.addEventListener("click", this.onLnkPopup_Click.bind(this, this.popups.Unavailable));
				
				this.Settings.LnkLanguage = this.BuildLink("language", "Settings_LnkLanguage");
				this.Settings.LnkLanguage.addEventListener("click", this.onBtnLanguage_Click.bind(this));
				
				this.Settings.LnkContact = this.BuildLink("contact", "Settings_LnkContact");
				this.Settings.LnkContact.href = "mailto:staubibr@gmail.com?subject=" + Lang.Nls("Settings_Subject_Comment");
				
				
				// this.Settings.LnkIssues = this.BuildLink("issues", "Settings_LnkIssues");
				// this.Settings.LnkIssues.href = "mailto:staubibr@gmail.com?subject=" + Lang.Nls("Settings_Subject_Issues");
				
				// this.Settings.LnkShare = this.BuildLink("share", "Settings_LnkShare");
				// this.Settings.LnkTechnical = this.BuildLink("technical", "Settings_LnkTechnical");
			},
			
			// TODO : Maybe about should be in a view, more like a widget of some kind or just in a container.
			BuildAboutPopup : function() {
				var popup = new ModalPopup({ 
					domNode : Dom.Create("div", { className:"About" }, document.body),
					title 	: Lang.Nls("Settings_About_Note1")
				})

				this.BuildLabel("h4", null, popup.body, Lang.Nls("Settings_About_Note2"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note3"));
				this.BuildLabel("h4", null, popup.body, Lang.Nls("Settings_About_Note4"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note5"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note6"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note7"));
				this.BuildLabel("h4", null, popup.body, Lang.Nls("Settings_About_Note8"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note9"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note10"));
				this.BuildLabel("h4", null, popup.body, Lang.Nls("Settings_About_Note11"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note12"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note13"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note14"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_About_Note15"));
				
				return popup;
			},
			
			BuildTermsPopup : function() {
				var popup = new ModalPopup({ 
					domNode : Dom.Create("div", { className:"Terms" }, document.body),
					title 	: Lang.Nls("Settings_Terms_Note1")
				})

				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_Terms_Note2"));
				this.BuildLabel("h4", null, popup.body, Lang.Nls("Settings_Terms_Note3"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_Terms_Note4"));
				this.BuildLabel("h4", null, popup.body, Lang.Nls("Settings_Terms_Note5"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_Terms_Note6"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_Terms_Note7"));
				
				return popup;
			},
			
			BuildLicensePopup : function() {
				var popup = new ModalPopup({ 
					domNode : Dom.Create("div", { className:"License" }, document.body),
					title 	: Lang.Nls("Settings_License_Note1")
				})

				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_License_Note2"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_License_Note3"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_License_Note4"));
				this.BuildLabel("h3", null, popup.body, Lang.Nls("Settings_License_Note5"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_License_Note6"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_License_Note7"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_License_Note8"));
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_License_Note9"));
				
				return popup;
			},
			
			// TODO : Maybe about should be in a view, more like a widget of some kind or just in a container.
			BuildUnavailablePopup : function() {
				var popup = new ModalPopup({ 
					domNode : Dom.Create("div", { className:"Unavailable" }, document.body),
					title 	: Lang.Nls("Settings_Unavailable_Note1")
				})
				
				this.BuildLabel("p", null, popup.body, Lang.Nls("Settings_Unavailable_Note2"));
				
				return popup;
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