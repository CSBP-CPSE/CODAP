
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Exp/components/views/modal",
		  "Exp/components/views/collapsible"],
    
	function (Lang,
			  Dom,
			  ModalView,
			  CollapsibleView) {

		var settingsView = Lang.Declare("SettingsView", [CollapsibleView], { 
				
			Settings :null,
				
			constructor : function() {
				Dom.AddCss(this.domNode, "Settings");	

				this.BuildAboutView();
				this.BuildUnavailableView();
				this.BuildSettings();
			},
			
			BuildSettings : function() {
				this.Settings = {};
				this.Settings.Title = Dom.Create("div", { "className":"Title" });
				this.Settings.BtnLogout = Dom.Create("button", { "className" : "Button Logout" });
				
				Dom.Place(this.Settings.Title, this.domNode);
				Dom.Place(this.Settings.BtnLogout, this.domNode);
				
				this.Settings.LnkAbout = this.BuildLink("about", "Settings_LnkAbout");
				this.Settings.LnkTutorial = this.BuildLink("disabled tutorial", "Settings_LnkTutorial");
				this.Settings.LnkLanguage = this.BuildLink("disabled language", "Settings_LnkLanguage");
				this.Settings.LnkIssues = this.BuildLink("disabled issues", "Settings_LnkIssues");
				this.Settings.LnkContact = this.BuildLink("disabled contact", "Settings_LnkContact");
				
				// this.Settings.LnkShare = this.BuildLink("share", "Settings_LnkShare");
				// this.Settings.LnkLicense = this.BuildLink("license", "Settings_LnkLicense");
				// this.Settings.LnkTechnical = this.BuildLink("technical", "Settings_LnkTechnical");
				
				this.Settings.Title.innerHTML = Lang.Nls("Settings_Title");
				this.Settings.BtnLogout.innerHTML = Lang.Nls("Settings_BtnLogout");
				
				this.Settings.BtnLogout.addEventListener("click", this.onBtnLogout_Click.bind(this));
				this.Settings.LnkAbout.addEventListener("click", this.onBtnAbout_Click.bind(this));
				this.Settings.LnkTutorial.addEventListener("click", this.onBtnUnavailable_Click.bind(this));
				this.Settings.LnkLanguage.addEventListener("click", this.onBtnUnavailable_Click.bind(this));
				this.Settings.LnkIssues.addEventListener("click", this.onBtnUnavailable_Click.bind(this));
				this.Settings.LnkContact.addEventListener("click", this.onBtnUnavailable_Click.bind(this));
			},
			
			// TODO : Maybe about should be in a view, more like a widget of some kind or just in a container.
			BuildAboutView : function() {
				this.aboutView = new ModalView({ 
					domNode 	: Dom.Create("div", { className:"About" }, document.body)
				})

				var container = Dom.Create("div", { "className":"Container" }, this.aboutView.domNode);
			
				var header = Dom.Create("div", { "className":"Header" }, container);
				
				this.BuildLabel("h3", "Title", header, Lang.Nls("Settings_About_Note1"));
				
				var btnClose1 = Dom.Create("button", { "className":"Button Close Icon" }, header);
				var body = Dom.Create("div", { "className":"Body" }, container);
				
				this.BuildLabel("h4", null, body, Lang.Nls("Settings_About_Note2"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note3"));
				this.BuildLabel("h4", null, body, Lang.Nls("Settings_About_Note4"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note5"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note6"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note7"));
				this.BuildLabel("h4", null, body, Lang.Nls("Settings_About_Note8"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note9"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note10"));
				this.BuildLabel("h4", null, body, Lang.Nls("Settings_About_Note11"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note12"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note13"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note14"));
				this.BuildLabel("p", null, body, Lang.Nls("Settings_About_Note15"));

				var footer = Dom.Create("div", { "className":"Footer" }, container);
				
				var btnClose2 = Dom.Create("button", { "className":"Button Close" }, footer);
			
				btnClose2.innerHTML = Lang.Nls("Settings_About_Close");
				
				btnClose1.addEventListener("click", this.onAboutBtnClose_Click.bind(this));
				btnClose2.addEventListener("click", this.onAboutBtnClose_Click.bind(this));
			},
			
			// TODO : Maybe about should be in a view, more like a widget of some kind or just in a container.
			BuildUnavailableView : function() {
				this.unavailableView = new ModalView({ 
					domNode 	: Dom.Create("div", { className:"Unavailable" }, document.body)
				})
				
				var container = Dom.Create("div", { "className":"Container" }, this.unavailableView.domNode);
				
				var header = Dom.Create("div", { "className":"Header" }, container);
				
				this.BuildLabel("h3", "Title", header, Lang.Nls("Settings_Unavailable_Note1"));
				
				var btnClose1 = Dom.Create("button", { "className":"Button Close Icon" }, header);
				var body = Dom.Create("div", { "className":"Body" }, container);
				
				this.BuildLabel("p", null, body, Lang.Nls("Settings_Unavailable_Note2"));
				
				btnClose1.addEventListener("click", this.onUnavailableBtnClose_Click.bind(this));
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
			
			onBtnUnavailable_Click : function(ev) { 
				this.unavailableView.FadeIn();
			},
			
			onBtnAbout_Click : function(ev) {
				this.aboutView.FadeIn();
			},
			
			onUnavailableBtnClose_Click : function(ev) {
				this.unavailableView.FadeOut();
			},
			
			onAboutBtnClose_Click : function(ev) {
				this.aboutView.FadeOut();
			},
			
			onBtnLogout_Click : function(ev) {
				this.controller.Logout();
				this.Collapse();
			}
		})
		
		return settingsView;
	})