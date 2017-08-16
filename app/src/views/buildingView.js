
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/util/array",
		  "Api/components/popup/modal",
		  "Api/plugins/domain!App/config/dom_access", 
		  "Api/plugins/domain!App/config/dom_building", 
		  "App/util/osm", 
		  "App/components/views/twoStep"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Array,
			  ModalPopup,
			  Dom_Access,
			  Dom_Building,
			  OSM,
			  TwoStep) {

		var editBuildingView = Lang.Declare("EditBuildingView", [TwoStep], { 
			
			popups : null,
			
			info : null,
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Building");	

				this.popups = {};
				this.popups.Save = this.BuildSavePopup();
				
				this.BuildView();
				
				this.on("viewExpanded", this.onViewExpanded.bind(this));
				this.on("viewCollapsed", this.onViewCollapsed.bind(this));
			},
			
			BuildView : function() {
				this.AddStep(this.BuildPage1());
				this.AddStep(this.BuildPage2());
				
				this.SetPage(0);
			},
			
			BuildPage1 : function() {
				var page = {};
				
				page.Top = Dom.Create("div", { "className":"Page One" });
				
				page.NoData = Dom.Create("div", { "className":"Page One NoData" }, page.Top);
				page.Data = Dom.Create("div", { "className":"Page One", "style":"display:none;" }, page.Top);
				
				page.Col1 = {};
				page.Col1.Top = Dom.Create("div", { "className":"Column Left" }, page.Data);
				
				page.Col1.Row1 = {};
				page.Col1.Row1.Top = Dom.Create("div", { "className":"Row" }, page.Col1.Top);
				page.Col1.Row1.Label = Dom.Create("div", { "className":"Label" }, page.Col1.Row1.Top);
				page.Col1.Row1.Value = Dom.Create("div", { "className":"Value" }, page.Col1.Row1.Top);
				
				page.Col1.Row2 = {};
				page.Col1.Row2.Top = Dom.Create("div", { "className":"Row" }, page.Col1.Top);
				page.Col1.Row2.Value = Dom.Create("div", { "className":"Value" }, page.Col1.Row2.Top);
				
				page.Col2 = {};
				page.Col2.Top = Dom.Create("div", { "className":"Column Right" }, page.Data);
				page.Col2.BtnEdit = Dom.Create("button", { "className":"Button Edit" }, page.Col2.Top);
				
				page.NoData.innerHTML = Lang.Nls("Building_LabelNoData");
				page.Col1.Row1.Label.innerHTML = Lang.Nls("Building_LabelBuilding") + ":";
				page.Col2.BtnEdit.innerHTML = Lang.Nls("Building_BtnEdit");
				
				page.Col2.BtnEdit.addEventListener("click", this.onBtnEdit_Click.bind(this));
				
				return page;
			},
			
			BuildPage2 : function() {
				var page = {};
				
				page.Top = Dom.Create("div", { "className":"Page Two" });
				page.Title = Dom.Create("div", { "className":"Title" }, page.Top);
				page.Container = Dom.Create("div", { "className":"Container" }, page.Top);
				
				OSM.Index.building.Info = new OSM.Index.building.InfoClass(page.Container);
				
				this.info = OSM.Index.building.Info;
				
				var div = Dom.Create("div", { "className":"Footer" }, page.Container);
				
				page.BtnSave = Dom.Create("button", { "className":"Button Save" }, div);
				page.BtnSave.innerHTML = Lang.Nls("Building_BtnSave") + '<div class="Icon">';
				page.BtnSave.addEventListener("click", this.onBtnSave_Click.bind(this));
				
				page.Title.innerHTML = Lang.Nls("Building_Title");
				
				return page;
			},
			
			// TODO : Maybe about should be in a view, more like a widget of some kind or just in a container.
			BuildSavePopup : function() {
				var domNode = Dom.Create("div", { className:"Save" }, document.body);
				
				var popup = new ModalPopup(domNode, { title:Lang.Nls("Building_Save_Note1") });
				
				var label = Dom.Create("p", { className : "Message" }, popup.nodes.Body);
				
				label.innerHTML = Lang.Nls("Building_Save_Note2");
				
				return popup;
			},
			
			onBtnSave_Click : function(ev) {
				var data = this.info.GetUpdateData();
				
				this.Disable();
				
				var p = this.controller.Save(data);
				
				p.then(this.onSave_Success.bind(this), this.onSave_Finished.bind(this));
			},
			
			onSave_Success : function(ev) {
				this.popups.Save.FadeIn();
				this.onSave_Finished(ev);
			},
			
			onSave_Finished : function(ev) {
				this.Enable();
				
				this.Collapse(false);
			},
			
			onBtnEdit_Click : function(ev) {
				this.SetPage(2);
			},
			
			ClearUI : function() {
				this.Steps[0].Col1.Row1.Value.innerHTML = ""
				this.Steps[0].Col1.Row2.Value.innerHTML = ""
				
				this.info.ClearUI();
				
				this.Steps[0].Data.style.display = 'none';
				this.Steps[0].NoData.style.display = '';
			},
			
			ShowBuilding : function() {
				this.ClearUI();
				
				if (!this.controller.model.Building.feature) return;
				
				this.Steps[0].Data.style.display = '';
				this.Steps[0].NoData.style.display = 'none';
				
				this.Steps[0].Col1.Row2.Value.innerHTML = this.controller.GetAddress();
				this.Steps[0].Col1.Row1.Value.innerHTML = this.controller.GetTag("building");

				var data = {
					"addr:street" 		: this.controller.GetTag("addr:street") || "",
					"addr:housenumber" 	: this.controller.GetTag("addr:housenumber") || "",
					"addr:postcode" 	: this.controller.GetTag("addr:postcode") || "",
					"note" 				: this.controller.GetTag("note") || "",
					"source" 			: this.controller.GetTag("source") || "",
					"fixme" 			: this.controller.GetTag("fixme") || "",
					"building" 			: this.controller.GetTag("building") || -1,
					"wheelchair" 		: this.controller.GetTag("wheelchair") || -1
				}
				
				this.info.SetData(data);
			},
			
			onController_ModelChange : function(ev) {
				this.ClearUI();
			},
			
			SetButtonEnabled : function(button, isEnabled) {
				button.disabled = !isEnabled;
				
				(isEnabled) ? Dom.RemoveCss(button, "Disabled") : Dom.AddCss(button, "Disabled");
			},
			
			Disable : function() {
				this.SetButtonEnabled(this.Steps[1].BtnSave, false);
			},
			
			Enable : function() {
				this.SetButtonEnabled(this.Steps[1].BtnSave, true);
			},
			
			onViewExpanded : function(ev) {
				this.controller.Activate();
			},
			
			onViewCollapsed : function(ev) {
				this.controller.model.Building = null;
				this.controller.Deactivate();
			}
		})
		
		return editBuildingView;
	})