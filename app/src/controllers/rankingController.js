
r.define(["Api/util/lang",
		  "Exp/components/controller"],
    
	function (Lang,
			  Controller) {

		var rankingController = Lang.Declare("RankingController", [Controller], { 
		
			model : null,
		
			options : null,
		
			constructor : function(options, subs) {			
				this.model = {};
			}
		})
		
		return rankingController;
	})