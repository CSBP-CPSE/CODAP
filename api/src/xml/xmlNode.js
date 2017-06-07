
r.define(["Api/util/lang", 
		  "Api/util/string", 
		  "Api/util/array"],
    
	function (Lang,
			  String,
			  Array) {

		var domain = Lang.Declare("XmlNode", null, { 
			
			constructor : function(name, attributes, children, value) {
				this.name = "";
				this.attributes = {};
				this.children = [];
				this.value = null;
				
				if (name != undefined) this.name = name;
				if (attributes != undefined) this.attributes = attributes;
				if (children != undefined) this.children = children;
				if (value != undefined) this.value = value;
			},
			
			AddAttribute : function(key, value) {
				this.attributes[key] = value;
			},
			
			AddChild : function(childNode) {
				this.children.push(childNode);

				return childNode;
			},
			
			AddChildren : function(childrenNodes) {
				Array.ForEach(childrenNodes, function(childNode){
					this.AddChild(childNode);
				}.bind(this));
				
				return childrenNodes;
			},
			
			ToXml : function() {
				var sXml = '<' + this.name;
				
				for (var k in this.attributes) {
					sXml = sXml + String.Format(' {0}="{1}"', [k, this.attributes[k]]);
				}
				
				if (this.children.length == 0 && this.value === null) return sXml + "/>";
				
				else sXml = sXml + ">";
				
				if (this.value != null) sXml = sXml + this.value;
				
				Array.ForEach(this.children, function(childNode){ 
					sXml = sXml + childNode.ToXml();
				}.bind(this));
				
				return sXml + String.Format('</{0}>', [this.name]);
			}
		});
		
		return domain;
	});