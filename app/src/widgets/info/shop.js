
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "App/widgets/info/info"],
    
	function (Lang,
			  Dom,
			  Array,
			  InfoWidget) {

		var shopInfo = Lang.Declare("ShopInfo", [InfoWidget], { 
			
			Build : function() {

			}
		})
		
		return shopInfo;
	})