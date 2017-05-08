
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Exp/components/views/modal"],
    
	function (Lang,
			  Dom,
			  Animate,
			  ModalView) {

		var loginView = Lang.Declare("LoginView", [ModalView], { 
			
			Login : {},
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Login");			

				this.BuildLogin();
				
				this.controller.once("ControllerModelChange", this.onFirstViewNotified_NewModel.bind(this));
			},
			
			BuildLogin : function() {
				this.container = Dom.Create("div", { "className":"Container" }, this.domNode);
			
				this.Login = {};
				this.Login.Inner = {};
				this.Login.Inner.Top = Dom.Create("div", { "className":"Inner" }, this.container);
				this.Login.Inner.Message = Dom.Create("div", { "className":"Message" }, this.Login.Inner.Top);
				
				// this.Login.Inner.Beta = Dom.Create("div", { "className":"Beta" }, this.Login.Inner.Top);
				
				this.Login.Inner.UserInfo = {};
				this.Login.Inner.UserInfo.Top = Dom.Create("div", { "className":"UserInfo", "style":"opacity:0; visibility:hidden;" }, this.Login.Inner.Top);
				this.Login.Inner.UserInfo.Label = Dom.Create("div", { "className":"Label" }, this.Login.Inner.UserInfo.Top);
			
				this.Login.Inner.Buttons = {};
				this.Login.Inner.Buttons.Top = Dom.Create("div", { "className":"Buttons" }, this.Login.Inner.Top);
				this.Login.Inner.Buttons.BtnGo = Dom.Create("button", { "className":"Button Go" }, this.Login.Inner.Buttons.Top);
				this.Login.Inner.Buttons.BtnLog = Dom.Create("button", { "className":"Button Log" }, this.Login.Inner.Buttons.Top);

				this.Login.Footer = {};
				this.Login.Footer.Top = Dom.Create("div", { "className":"Footer" }, this.container);
				// this.Login.Footer.BtnTutorial = Dom.Create("button", { "className":"Tutorial" }, this.Login.Footer.Top)
				this.Login.Footer.BtnLanguage = Dom.Create("button", { "className":"Language" }, this.Login.Footer.Top)
				
				this.Login.Inner.Buttons.BtnGo.innerHTML = Lang.Nls("Main_BtnGo");
				// this.Login.Footer.BtnTutorial.innerHTML = Lang.Nls("Main_ButtonTutorial");
				this.Login.Footer.BtnLanguage.innerHTML = Lang.Nls("Main_ButtonLanguage");
			
				// this.Login.Inner.Beta.innerHTML = Lang.Nls("Main_LoginMessage_4");
				this.Login.Inner.Buttons.BtnLog.addEventListener("click", this.BtnLog_OnClick.bind(this), false);
				this.Login.Inner.Buttons.BtnGo.addEventListener("click", this.BtnGo_OnClick.bind(this), false);
				this.Login.Footer.BtnLanguage.addEventListener("click", this.BtnLanguage_OnClick.bind(this), false);
			},
			
			UpdateLoginMessage : function(isLogged) {
				var text = Lang.Nls("Main_LoginMessage_1") + "<br><br>" + Lang.Nls("Main_LoginMessage_4") + "<br><br>" ;
				
				if (isLogged) {
					this.Login.Inner.Buttons.BtnLog.innerHTML = Lang.Nls("Main_BtnLog_Out");	
					this.Login.Inner.Message.innerHTML = text + Lang.Nls("Main_LoginMessage_3");
					this.Login.Inner.UserInfo.Label.innerHTML = this.controller.model.Details.name;
					
					Animate.Fade(this.Login.Inner.UserInfo.Top, true);
				}
				else {
					this.Login.Inner.Buttons.BtnLog.innerHTML =  Lang.Nls("Main_BtnLog_In") ;
					this.Login.Inner.Message.innerHTML = text + Lang.Nls("Main_LoginMessage_2");
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
			
			onFirstViewNotified_NewModel : function(model) {
				this.FadeIn(false);
			},
			
			onController_ModelChange : function(ev) {
				if (!ev.model.IsLogged) this.FadeIn(false);
			
				this.UpdateLoginMessage(ev.model.IsLogged);
				
				this.Login.Inner.Buttons.BtnGo.disabled = !this.controller.IsLogged();
			}
		})
		
		return loginView;
	})
