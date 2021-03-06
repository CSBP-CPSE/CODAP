
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "App/components/views/modal",
		  "App/widgets/about",
		  "App/widgets/terms"],
    
	function (Lang,
			  Dom,
			  Animate,
			  ModalView,
			  AboutWidget,
			  TermsWidget) {

		var loginView = Lang.Declare("LoginView", [ModalView], { 
			
			Login : {},
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Login");			

				this.popups = {};
				
				var domNode = Dom.Create("div", { className:"About" }, document.body);
				
				this.popups.About = new AboutWidget(domNode, { title:Lang.Nls("Settings_About_Note1") });
				
				var domNode = Dom.Create("div", { className:"Terms" }, document.body);
				
				this.popups.Terms = new TermsWidget(domNode, { title:Lang.Nls("Settings_Terms_Note1") });
				
				this.BuildLogin();
				
				this.controller.once("ControllerModelChange", this.onFirstViewNotified_NewModel.bind(this));
			},
			
			BuildLogin : function() {
				this.container = Dom.Create("div", { "className":"Container" }, this.domNode);
			
				this.Login = {};
				this.Login.Inner = {};
				this.Login.Inner.Top = Dom.Create("div", { "className":"Inner" }, this.container);
				this.Login.Inner.Message = Dom.Create("div", { "className":"Message" }, this.Login.Inner.Top);
				this.Login.Inner.About = Dom.Create("a", { "className":"Link" }, this.Login.Inner.Top);
				this.Login.Inner.Terms = Dom.Create("a", { "className":"Link" }, this.Login.Inner.Top);
				this.Login.Inner.Beta = Dom.Create("div", { "className":"Message" }, this.Login.Inner.Top);
				this.Login.Inner.User = Dom.Create("div", { "className":"Message" }, this.Login.Inner.Top);
				
				this.Login.Inner.UserInfo = {};
				this.Login.Inner.UserInfo.Top = Dom.Create("div", { "className":"UserInfo", "style":"opacity:0; visibility:hidden;" }, this.Login.Inner.Top);
				this.Login.Inner.UserInfo.Label = Dom.Create("div", { "className":"Label" }, this.Login.Inner.UserInfo.Top);
			
				this.Login.Inner.Buttons = {};
				this.Login.Inner.Buttons.Top = Dom.Create("div", { "className":"Buttons" }, this.Login.Inner.Top);
				this.Login.Inner.Buttons.BtnGo = Dom.Create("button", { "className":"Button Go" }, this.Login.Inner.Buttons.Top);
				this.Login.Inner.Buttons.BtnLog = Dom.Create("button", { "className":"Button Log" }, this.Login.Inner.Buttons.Top);

				this.Login.Footer = {};
				this.Login.Footer.Top = Dom.Create("div", { "className":"Footer" }, this.container);
				this.Login.Footer.BtnLanguage = Dom.Create("button", { "className":"Language" }, this.Login.Footer.Top)
				
				this.Login.Inner.Message.innerHTML = Lang.Nls("Main_LoginMessage_1");
				this.Login.Inner.Beta.innerHTML = Lang.Nls("Main_LoginMessage_4");
				this.Login.Inner.Buttons.BtnGo.innerHTML = Lang.Nls("Main_BtnGo");
				this.Login.Footer.BtnLanguage.innerHTML = Lang.Nls("Main_ButtonLanguage");
			
				this.Login.Inner.About.innerHTML = Lang.Nls("Main_LoginLink_About");
				this.Login.Inner.Terms.innerHTML = Lang.Nls("Main_LoginLink_Terms");
			
				this.Login.Inner.Buttons.BtnLog.addEventListener("click", this.BtnLog_OnClick.bind(this), false);
				this.Login.Inner.Buttons.BtnGo.addEventListener("click", this.BtnGo_OnClick.bind(this), false);
				this.Login.Footer.BtnLanguage.addEventListener("click", this.BtnLanguage_OnClick.bind(this), false);
				
				this.Login.Inner.About.addEventListener("click", this.onLnkPopup_Click.bind(this, this.popups.About));
				this.Login.Inner.Terms.addEventListener("click", this.onLnkPopup_Click.bind(this, this.popups.Terms));
			},
			
			UpdateLoginMessage : function(isLogged) {
				
				if (isLogged) {
					this.Login.Inner.Buttons.BtnLog.innerHTML = Lang.Nls("Main_BtnLog_Out");	
					this.Login.Inner.User.innerHTML = Lang.Nls("Main_LoginMessage_3");
					this.Login.Inner.UserInfo.Label.innerHTML = this.controller.model.Details.name;
					
					Animate.Fade(this.Login.Inner.UserInfo.Top, true);
				}
				else {
					this.Login.Inner.Buttons.BtnLog.innerHTML =  Lang.Nls("Main_BtnLog_In") ;
					this.Login.Inner.User.innerHTML = Lang.Nls("Main_LoginMessage_2");
					this.Login.Inner.UserInfo.Label.innerHTML = "";
					
					Animate.Fade(this.Login.Inner.UserInfo.Top, false);
				}
			},
			
			BtnGo_OnClick : function(e) { 
				this.FadeOut();
			},
			
			BtnLog_OnClick : function(e) {
				if (this.controller.IsLogged()) this.controller.Logout();		

				else this.controller.Login();		
			},
			
			BtnLanguage_OnClick : function(e) {
				var lang = (Lang.locale == "en") ? "fr" : "en" ;
				
				window.open(location.origin + location.pathname + "?locale=" + lang, "_self");
			},
			
			DoLogin : function() {
				if (!this.controller.IsLogged()) this.FadeIn(false);
			
				this.UpdateLoginMessage(this.controller.model.IsLogged);
				
				this.Login.Inner.Buttons.BtnGo.disabled = !this.controller.IsLogged();
			},
			
			onFirstViewNotified_NewModel : function(model) {
				this.FadeIn(false);
			},
			
			onController_ModelChange : function(ev) {
				this.DoLogin();
			},
			
			onLnkPopup_Click : function(popup, ev) {
				popup.FadeIn();
			}
		})
		
		return loginView;
	})
