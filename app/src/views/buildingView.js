
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/util/array",
		  "Api/components/popup/modal",
		  "Api/plugins/domain!App/config/dom_access", 
		  "Api/plugins/domain!App/config/dom_building", 
		  "Exp/components/views/collapsible"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Array,
			  ModalPopup,
			  Dom_Access,
			  Dom_Building,
			  CollapsibleView) {

		var editBuildingView = Lang.Declare("EditBuildingView", [CollapsibleView], { 
				
			Ranking :null,
			
			popups : null,
			
			Steps : [],
			Step  : 0,
			
			constructor : function() {
				Dom.AddCss(this.domNode, "Building");	

				this.popups = {};
				this.popups.Save = this.BuildSavePopup();
				
				this.BuildView();
				
				this.on("viewCollapsed", function(ev) { this.SetPage(0); }.bind(this));
				this.on("viewExpanded", function(ev) { this.SetPage(1); }.bind(this));
			},
			
			BuildView : function() {
				this.Steps.push(this.BuildPage1());
				this.Steps.push(this.BuildPage2());
				
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
				
				
				page.LblBuilding = Dom.Create("div", { "className":"Label Building" }, page.Container);
				page.CbxBuilding = Dom.Create("select", { "className":"Combo Building" }, page.Container);
				page.LblAddress = Dom.Create("div", { "className":"Label Address" }, page.Container);
				page.IptStreet = Dom.Create("input", { "className":"Input Street" }, page.Container);
				
				page.Row = {};
				page.Row.Top = Dom.Create("div", { "className":"Row" }, page.Container);
				
				var div = Dom.Create("div", { "className":"Gutter" }, page.Row.Top);
				page.Row.IptNumber = Dom.Create("input", { "className":"Input Number" }, div);
				
				var div = Dom.Create("div", { "className":"Gutter" }, page.Row.Top);
				page.Row.IptPostal = Dom.Create("input", { "className":"Input Postal" }, div);
				
				page.LblAccess = Dom.Create("div", { "className":"Label Accessible" }, page.Container);
				page.CbxAccess = Dom.Create("select", { "className":"Combo Access" }, page.Container);
				page.IptDescr = Dom.Create("input", { "className":"Input Description" }, page.Container);
				
				page.LblSource = Dom.Create("div", { "className":"Label Source" }, page.Container);
				page.IptSource = Dom.Create("input", { "className":"Input Source" }, page.Container);
				
				page.LblFixme = Dom.Create("div", { "className":"Label Fixme" }, page.Container);
				page.IptFixme = Dom.Create("input", { "className":"Input Fixme" }, page.Container);
				
				var div = Dom.Create("div", { "className":"Footer" }, page.Container);
				
				page.BtnSave = Dom.Create("button", { "className":"Button Save" }, div);
	
				// Dom.Create("image", { "src":"../assets/icon.png" ,"className":"Icon" }, page.BtnSave);
				
				// page.LblNoPlace = Dom.Create("div", { "className":"Label NoPlace" }, div);
				// page.BtnDelete = Dom.Create("button", { "className":"Button Delete" }, div);
				
				page.Title.innerHTML = Lang.Nls("Building_Title");
				page.LblBuilding.innerHTML = Lang.Nls("Building_LabelBuilding");
				page.LblAddress.innerHTML = Lang.Nls("Building_LabelAddress");
				page.LblAccess.innerHTML = Lang.Nls("Building_LabelAccess");
				page.LblSource.innerHTML = Lang.Nls("Building_LabelSource");
				page.LblFixme.innerHTML = Lang.Nls("Building_LabelFixme");
				page.BtnSave.innerHTML = Lang.Nls("Building_BtnSave") + '<div class="Icon">';
				
				// page.LblNoPlace.innerHTML = Lang.Nls("Building_LabelNoPlace");
				// page.BtnDelete.innerHTML = Lang.Nls("Building_BtnDelete");
				
				page.IptStreet.placeholder = Lang.Nls("Building_PH_Street");
				page.Row.IptNumber.placeholder = Lang.Nls("Building_PH_Number");
				page.Row.IptPostal.placeholder = Lang.Nls("Building_PH_Postal");
				page.IptDescr.placeholder = Lang.Nls("Building_PH_Descr");
				page.IptSource.placeholder = Lang.Nls("Building_PH_Source");
				page.IptFixme.placeholder = Lang.Nls("Building_PH_Fixme");

				Array.ForEach(Dom_Access.Sort().Options(), function(option) { page.CbxAccess.add(option); });
				Array.ForEach(Dom_Building.Sort().Options(), function(option) { page.CbxBuilding.add(option); });
				
				// page.BtnDelete.addEventListener("click", this.onBtnDelete_Click.bind(this));
				page.BtnSave.addEventListener("click", this.onBtnSave_Click.bind(this));
				
				return page;
			},
			
			// TODO : Maybe about should be in a view, more like a widget of some kind or just in a container.
			BuildSavePopup : function() {
				var popup = new ModalPopup({ 
					domNode : Dom.Create("div", { className:"Save" }, document.body),
					title 	: Lang.Nls("Building_Save_Note1")
				});
				
				var label = Dom.Create("p", { className : "Message" }, popup.body);
				
				label.innerHTML = Lang.Nls("Building_Save_Note2");
				
				return popup;
			},
			
			GetUpdateData : function() {
				return {
					"addr:street" 		: this.ReadInput(this.Steps[1].IptStreet.value),
					"addr:housenumber" 	: this.ReadInput(this.Steps[1].Row.IptNumber.value),
					"addr:postcode" 	: this.ReadInput(this.Steps[1].Row.IptPostal.value),
					"note"  			: this.ReadInput(this.Steps[1].IptDescr.value),
					"source" 			: this.ReadInput(this.Steps[1].IptSource.value),
					"fixme"  			: this.ReadInput(this.Steps[1].IptFixme.value),
					"building" 			: this.ReadInput(this.Steps[1].CbxBuilding.value),
					"wheelchair"	 	: this.ReadInput(this.Steps[1].CbxAccess.value)
				}
			},
			
			ReadInput : function(data) {
				if (data == null || data == undefined) return null;
				
				if (data.length == 0) return null;
				
				return data;
			},
			
			onCollapsibleClicked : function(ev) {
				if (this.Step == 1) {
					this.controller.Clear();
					this.Collapse(false);
					this.emit("collapsibleClicked");
				}
				else this.SetPage(1);
			},
			
			onBtnEdit_Click : function(ev) {
				this.SetPage(2);
			},
			
			onBtnSave_Click : function(ev) {
				var data = this.GetUpdateData();
				
				this.SetButtonEnabled(this.Steps[1].BtnSave, false);
				
				var p = this.controller.Save(data);
				
				// Todo : Show wait animation
				
				p.then(this.onSave_Finished.bind(this), this.onSave_Finished.bind(this));
			},
			
			onSave_Success : function(ev) {
				this.popups.Save.FadeIn();
				this.onSave_Finished(ev);
			},
			
			onSave_Finished : function(ev) {
				this.SetButtonEnabled(this.Steps[1].BtnSave, true);
				this.controller.Clear();
				this.Collapse(false);
			},
			
			onBtnDelete_Click : function(ev) {
				this.controller.Clear();
				this.Collapse(false);
			},
			
			SetButtonEnabled : function(button, isEnabled) {
				button.disabled = !isEnabled;
				
				(isEnabled) ? Dom.RemoveCss(button, "Disabled") : Dom.AddCss(button, "Disabled");
			},
			
			ClearUI : function() {
				this.Steps[0].Col1.Row1.Value.innerHTML = ""
				this.Steps[0].Col1.Row2.Value.innerHTML = ""
				this.Steps[1].IptStreet.value = "";
				this.Steps[1].Row.IptNumber.value = "";
				this.Steps[1].Row.IptPostal.value = "";
				this.Steps[1].IptDescr.value = "";
				this.Steps[1].CbxBuilding.value = -1;
				this.Steps[1].CbxAccess.value = -1;
				
				this.Steps[0].Data.style.display = 'none';
				this.Steps[0].NoData.style.display = '';
			},
			
			onController_ModelChange : function(ev) {
				this.ClearUI();
				
				if (!ev.model.Selected) return;
				
				this.Steps[0].Data.style.display = '';
				this.Steps[0].NoData.style.display = 'none';
				
				this.Steps[0].Col1.Row2.Value.innerHTML = this.controller.GetAddress();
				this.Steps[0].Col1.Row1.Value.innerHTML = this.controller.GetTag("building");
				this.Steps[1].IptStreet.value = this.controller.GetTag("addr:street");
				this.Steps[1].Row.IptNumber.value = this.controller.GetTag("addr:housenumber");
				this.Steps[1].Row.IptPostal.value = this.controller.GetTag("addr:postcode");
				this.Steps[1].IptDescr.value = this.controller.GetTag("note");
				this.Steps[1].IptSource.value = this.controller.GetTag("source");
				this.Steps[1].IptFixme.value = this.controller.GetTag("fixme");

				this.SetComboxValue(this.Steps[1].CbxBuilding, "building");
				this.SetComboxValue(this.Steps[1].CbxAccess, "wheelchair");
			},
			
			SetComboxValue : function(combox, tag) {
				if (this.controller.HasTag(tag)) combox.value = this.controller.GetTag(tag);
				
				else combox.selectedIndex = -1;
			},
			
			SetPage : function(idx) {
				var node1 = (this.Step != 0) ? this.Steps[this.Step - 1].Top : null ;
				var node2 = (idx != 0) ? this.Steps[idx - 1].Top : null;
				
				if (node1) Dom.Remove(node1, this.domNode);
				if (node2) Dom.Place(node2, this.domNode);
				
				Animate.WipeV(this.domNode, (idx > this.Step));
			
				Dom.ToggleCss(this.domNode, "step" + (this.Step), "step" + (idx))
				
				this.Step = idx;
			}
		})
		
		return editBuildingView;
	})