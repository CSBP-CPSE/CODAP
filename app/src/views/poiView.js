
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/util/array",
		  "Api/components/popup/modal",
		  "Exp/components/views/collapsible"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Array,
			  ModalPopup,
			  CollapsibleView) {

		var POIView = Lang.Declare("POIView", [CollapsibleView], { 							
			
			popups : null,
			
			Steps : [],
			Step  : 0,
			
			constructor : function() {
				Dom.AddCss(this.domNode, "POI");	

				this.popups = {};
				this.popups.Save = this.BuildSavePopup();
				
				this.BuildView();
				
				this.on("viewCollapsed", function(ev) { this.SetPage(0); }.bind(this));
				this.on("viewExpanded", function(ev) { this.SetPage(1); }.bind(this));
			},
			
			BuildView : function() {
				this.POI = {};
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
				
				return page;
			},
			
			// TODO : Maybe about should be in a view, more like a widget of some kind or just in a container.
			BuildSavePopup : function() {
				var domNode = Dom.Create("div", { className:"Save" }, document.body);
				
				var popup = new ModalPopup(domNode, { title:Lang.Nls("Building_Save_Note1") });
				
				var label = Dom.Create("p", { className : "Message" }, popup.body);
				
				label.innerHTML = Lang.Nls("Building_Save_Note2");
				
				return popup;
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
			
			ClearUI : function() { 
				this.Steps[0].Col1.Row1.Value.innerHTML = ""
				this.Steps[0].Col1.Row2.Value.innerHTML = ""
			
				this.Steps[0].Data.style.display = 'none';
				this.Steps[0].NoData.style.display = '';
			},
			
			onController_ModelChange : function(ev) { 
				this.ClearUI();
				
				if (!ev.model.POI) return;
				
				this.Steps[0].Data.style.display = '';
				this.Steps[0].NoData.style.display = 'none';
				
				this.Steps[0].Col1.Row2.Value.innerHTML = this.controller.GetAddress();
				this.Steps[0].Col1.Row1.Value.innerHTML = this.controller.GetLabel();
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
		
		return POIView;
	})