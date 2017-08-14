
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/plugins/domain!App/config/dom_access", 
		  "Api/plugins/domain!App/config/dom_building", 
		  "Api/components/evented"],
    
	function (Lang,
			  Dom,
			  Array,
			  Dom_Access,
			  Dom_Building,
			  Evented) {

		var info = Lang.Declare("Info", [Evented], { 
			
			constructor : function(domNode) {
				this.root = domNode || Dom.Create("div");
				
				Dom.AddCss(this.root, "Info");	
				
				this.container = Dom.Create("div", {}, this.root);
				
				this.inputs = {};
				
				this.nodes = this.Build(domNode);
			},
			
			Build : function() {
				
			},
			
			AddRow : function(domNode) {
				return Dom.Create("div", { "className":"Row" }, domNode || this.container);
			},
			
			AddGutter : function(domNode) {
				return Dom.Create("div", { "className":"Gutter" }, domNode || this.container);
			},
			
			AddLabel : function(className, text, domNode) {
				var lbl = Dom.Create("div", { "className":"Label " + className }, domNode || this.container);
				
				lbl.innerHTML = text;
				
				return lbl;
			},
			
			AddInput : function(id, className, placeholder, domNode) {
				var ipt = Dom.Create("input", { "className":"Input " + className }, domNode || this.container);
				
				ipt.placeholder = placeholder;
				
				this.inputs[id] = ipt;
				
				return ipt;
			},
			
			AddCombox : function(id, className, domain, domNode) {
				var cbx = Dom.Create("select", { "className":"Combo " + className }, domNode || this.container);
				
				Array.ForEach(domain.Sort().Options(), function(option) { cbx.add(option); });
				
				this.inputs[id] = cbx;
				
				return cbx;
			},
			
			ReadInput : function(input) {
				var data = input.value;
				
				if (data == null || data == undefined) return null;
				
				if (data.length == 0) return null;
				
				return data;
			},
			
			ClearUI : function() {
				for (var id in this.inputs) {
					var ctrl = this.inputs[id];
					
					ctrl.value = "";
				}
			},
			
			GetUpdateData : function() {
				var data = {};
				
				for (var id in this.inputs) {
					data[id] = this.ReadInput(this.inputs[id]);
				};
				
				return data;
			},
			
			SetData : function(data) {				
				for (var id in this.inputs) {
					if (data.hasOwnProperty(id)) this.inputs[id].value = data[id];					
				};
			}
		})
		
		return info;
	})