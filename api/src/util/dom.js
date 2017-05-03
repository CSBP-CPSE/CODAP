
r.define(["Api/util/lang"],

	function (Lang) {

	    return {
			Node : function(pNode, selector) {
				return pNode.querySelectorAll(selector).item(0) || null;
			},
			
			Create : function(tagName, options, pNode) {
				var elem = document.createElement(tagName);
				
				Lang.Mixin(elem, options);
				
				this.Place(elem, pNode);
				
				return elem
			},
			
			Place : function(elem, pNode) {
				if (!!pNode) pNode.appendChild(elem);
			},
			
			Remove : function(elem, pNode) {
				if (!!pNode && pNode.contains(elem)) pNode.removeChild(elem);
			},
			
			Empty : function(elem) {
				while (elem.firstChild) {
					elem.removeChild(elem.firstChild);
				}
			},
			
			AddCss : function(domNode, css) {
				if (domNode.className.indexOf(css) !== -1) return;
				
				domNode.className += " " + css;
			},
			
			RemoveCss : function(domNode, css) {
				var clsses = domNode.className.split(' ');
				
				domNode.className = clsses.filter(function(c) { return c !== css }).join(" ");
			},
			
			HasCss : function(domNode, css) {
				return (' ' + domNode.className + ' ').indexOf(' ' + css + ' ') > -1;
			},
			
			ToggleCss : function(domNode, oldV, newV) {
				// Try replace
				domNode.className = domNode.className.replace(oldV, newV);
			
				// Add if replace not possible
				this.AddCss(domNode, newV);
			} 
		}
	})