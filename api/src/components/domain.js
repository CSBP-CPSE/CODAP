
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array"],
    
	function (Lang,
			  Dom,
			  Array) {

		var domain = Lang.Declare("Domain", null, { 
		
			items : null,
		
			constructor : function() {
				this.items = [];
			},
		
			Add : function(item) {
				this.items.push(item);
			},
			
			Sort : function(locale) {
				if (!locale) locale = Lang.locale;
				
				this.items = this.items.sort(function(a, b) { 
					if (a.text[locale] < b.text[locale]) return -1;
					if (a.text[locale] > b.text[locale]) return 1;
					return 0; 
				});
				
				return this;
			},
			
			List : function(locale) {
				if (!locale) locale = Lang.locale;
				
				return Array.Map(this.items, function(item) {
					return {
						value : item.value,
						text  : item.text[locale]
					}
				});
			},
			
			Options : function(locale) {
				if (!locale) locale = Lang.locale;
				
				return Array.Map(this.items, function(item) {
					return Dom.Create("option", { "text":item.text[locale], "value":item.value })
				});
			}
		
		});
		
		return domain;
	});