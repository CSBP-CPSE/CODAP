
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/util/array",
		  "Api/components/popup/modal",
		  "App/helpers/osm", 
		  "Api/plugins/domain!App/config/dom_category", 
		  "App/components/views/twoStep"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Array,
			  ModalPopup,
			  OSM,
			  Dom_Category,
			  TwoStep) {

		var POIView = Lang.Declare("POIView", [TwoStep], { 							
			
			popups : null,
			
			categories : null,
			
			active : null,
			
			constructor : function() {
				Dom.AddCss(this.domNode, "POI");	

				this.popups = {};
				this.popups.Save = this.BuildSavePopup();
				
				this.categories = Array.Filter(OSM.Categories, function(cat) { return cat.Type === "POI"; });
				
				this.BuildView();
				
				this.SetActiveCategory(this.categories[0]);
				
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
				
				page.Top = Dom.Create("div", { "className":"Watch Page One" });
				
				page.NoData = Dom.Create("div", { "className":"Page One NoData" }, page.Top);
				page.NoData.innerHTML = Lang.Nls("POI_LabelNoData");
				
				page.Data = Dom.Create("div", { "className":"Page One", "style":"display:none;" }, page.Top);
				page.Container = Dom.Create("div", {}, page.Data);
				
				page.Exist = this.BuildExistingPoi();
				page.New = this.BuildNewPoi();

				var div = Dom.Create("div", { "className":"Column Right" }, page.Data);
				
				page.BtnEdit = Dom.Create("button", { "className":"Button Edit" }, div);
				page.BtnEdit.innerHTML = Lang.Nls("Building_BtnEdit");
				page.BtnEdit.addEventListener("click", this.onBtnEdit_Click.bind(this));
				
				return page;
			},
			
			BuildExistingPoi : function(domNode) {
				var ui = {};
				
				ui.root = Dom.Create("div", { "className":"Column Left" }, domNode);
				
				ui.Row1 = Dom.Create("div", { "className":"Row" }, ui.root);
				ui.Label1 = Dom.Create("div", { "className":"Label" }, ui.Row1);
				ui.Value1 = Dom.Create("div", { "className":"Value" }, ui.Row1);
				
				ui.Row2 = Dom.Create("div", { "className":"Row" }, ui.root);
				ui.Label2 = Dom.Create("div", { "className":"Label" }, ui.Row2);
				ui.Value2 = Dom.Create("div", { "className":"Value" }, ui.Row2);
				
				ui.Label1.innerHTML = Lang.Nls("POI_LabelName");
				
				return ui;
			},
			
			BuildNewPoi : function(domNode) {
				var ui = {};
				
				ui.root = Dom.Create("div", { "className":"Column Left NewData" }, domNode);
				ui.Label1 = Dom.Create("div", { "className":"Label" }, ui.root);
				
				ui.Label1.innerHTML = Lang.Nls("POI_LabelNewData");
				
				return ui;
			},
			
			BuildPage2 : function() {	
				var page = {};
				
				page.Top = Dom.Create("div", { "className":"Page Two" });
				page.Title = Dom.Create("div", { "className":"Title" }, page.Top);
				page.Container = Dom.Create("div", { "className":"Container" }, page.Top);	
				
				page.LblCategory = Dom.Create("div", { "className":"Label" }, page.Container);
				page.CbxCategory = Dom.Create("select", { "className":"Combo Category" }, page.Container);
				
				page.InfoContainer = Dom.Create("div", { "className":"Info-Container" }, page.Container);	
				
				Array.ForEach(this.categories, function(cat) { cat.Info = new cat.InfoClass(); }.bind(this));
				
				Array.ForEach(Dom_Category.Sort().Options(), function(option) { page.CbxCategory.add(option); });
				
				var div = Dom.Create("div", { "className":"Footer" }, page.Container);
				
				page.BtnSave = Dom.Create("button", { "className":"Button Save" }, div);
				page.BtnSave.innerHTML = Lang.Nls("Building_BtnSave") + '<div class="Icon">';
				page.BtnSave.addEventListener("click", this.onBtnSave_Click.bind(this));
				
				page.LblCategory.innerHTML = Lang.Nls("POI_LabelCategory");
				page.Title.innerHTML = Lang.Nls("POI_Title");
				
				page.CbxCategory.addEventListener("change", this.onCbxCategory_Change.bind(this));
				
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
			
			ClearUI : function() {
				this.Steps[0].Exist.Value1.innerHTML = "";
				this.Steps[0].Exist.Label2.innerHTML = "";
				this.Steps[0].Exist.Value2.innerHTML = "";
				
				Array.ForEach(this.categories, function(cat) { cat.Info.ClearUI(); });
				
				this.Steps[0].Data.style.display = 'none';
				this.Steps[0].NoData.style.display = '';
			},
			
			ShowPOI : function() {
				this.ClearUI();
				
				this.Steps[0].NoData.style.display = 'none';
				this.Steps[0].Data.style.display = '';
				
				(this.controller.model.POI.type === null) ? this.ShowNewPOI() : this.ShowExistingPOI() ;
			
				var data = this.controller.model.POI.feature.getProperties().tags;
				
				this.active.Info.SetData(data);
			},
			
			ShowExistingPOI : function() {
				this.Steps[0].BtnEdit.innerHTML = Lang.Nls("Building_BtnEdit");
				
				var category = OSM.Category(this.controller.model.POI.feature);
				
				this.SetActiveCategory(category);
				
				Dom.Empty(this.Steps[0].Container);
				Dom.Place(this.Steps[0].Exist.root, this.Steps[0].Container);
				
				this.Steps[0].Exist.Label1.innerHTML = Lang.Nls("POI_LabelName") + ":";
				this.Steps[0].Exist.Value1.innerHTML = this.controller.GetTag("name");
				
				var type = this.controller.model.POI.type;
				
				this.Steps[0].Exist.Label2.innerHTML = ((type == "amenity") ? Lang.Nls("POI_LabelAmenity") : Lang.Nls("POI_LabelShop")) + ":";
				this.Steps[0].Exist.Value2.innerHTML = (type == "amenity") ? this.controller.GetTag("amenity") : this.controller.GetTag("shop");
			},
			
			ShowNewPOI : function() {
				this.Steps[0].BtnEdit.innerHTML = Lang.Nls("POI_BtnNewData");
				
				this.SetActiveCategory(this.categories[0]);
				
				Dom.Empty(this.Steps[0].Container);
				Dom.Place(this.Steps[0].New.root, this.Steps[0].Container);
			},
			
			SetActiveCategory : function(category) {
				this.active = category;
				
				this.Steps[1].CbxCategory.value = this.active.Id;
				
				Dom.Empty(this.Steps[1].InfoContainer);
				
				Dom.Place(category.Info.root, this.Steps[1].InfoContainer);
			},
			
			onController_ModelChange : function(ev) {
				this.ClearUI();
			},
			
			onCbxCategory_Change : function(ev) {
				var id = this.Steps[1].CbxCategory.value;
				
				this.SetActiveCategory(OSM.Index[id]);
				
				var data = this.controller.model.POI.feature.getProperties().tags;
				
				this.active.Info.SetData(data);
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
				this.controller.Clear();
				this.controller.Deactivate();
			},
			
			onBtnSave_Click : function(ev) {
				var data = this.active.Info.GetUpdateData();
				
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
				
				this.controller.Clear();
				this.Collapse(false);
			},
			
			onBtnEdit_Click : function(ev) {
				this.SetPage(2);
			}
		})
		
		return POIView;
	})