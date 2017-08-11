
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/animate",
		  "Api/util/array",
		  "App/components/views/collapsible"],
    
	function (Lang,
			  Dom,
			  Animate,
			  Array,
			  CollapsibleView) {

		var twoStep = Lang.Declare("TwoStep", [CollapsibleView], { 
			
			constructor : function() {
				this.Steps = [];
				this.Step = 0;
				
				Dom.AddCss(this.domNode, "TwoStep");	

				this.on("viewCollapsed", function(ev) { this.SetPage(0); }.bind(this));
				this.on("viewExpanded", function(ev) { this.SetPage(1); }.bind(this));
			},
			
			AddStep : function(step) {
				this.Steps.push(step);
			},

			onCollapsibleClicked : function(ev) {
				if (this.Step == 1) {
					this.Collapse(false);
					this.emit("collapsibleClicked");
				}
				else this.SetPage(1);
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
		
		return twoStep;
	})