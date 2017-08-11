
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "App/widgets/info/info"],
    
	function (Lang,
			  Dom,
			  Array,
			  InfoWidget) {

		var amenityInfo = Lang.Declare("AmenityInfo", [InfoWidget], { 
			
			Build : function() {

			}
		})
		
		return amenityInfo;
	})