
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Exp/components/views/collapsible"],
    
	function (Lang,
			  Dom,
			  CollapsibleView) {

		var rankingView = Lang.Declare("RankingView", [CollapsibleView], { 
				
			Ranking :null,
				
			constructor : function() {
				Dom.AddCss(this.domNode, "Ranking");	

				this.BuildRankings();
			},
			
			BuildRankings : function() {
				this.Ranking = {};
				this.Ranking.Title = Dom.Create("div", { "className":"Title" }, this.domNode);
				this.Ranking.Note = Dom.Create("div", { "className":"Note" }, this.domNode);
				this.Ranking.Container = {};
				this.Ranking.Container.Top = Dom.Create("div", { "className":"Container" }, this.domNode);
				this.Ranking.Container.Rank1 = this.BuildRank(1, this.Ranking.Container.Top);
				this.Ranking.Container.Rank2 = this.BuildRank(2, this.Ranking.Container.Top);
				this.Ranking.Container.Rank3 = this.BuildRank(3, this.Ranking.Container.Top);
				
				this.Ranking.Title.innerHTML = Lang.Nls("Ranking_Title");
				this.Ranking.Note.innerHTML = Lang.Nls("Ranking_Note");
			},
			
			BuildRank : function(n, pNode) {
				var rank = {};
				rank.Top = Dom.Create("div", { "className":"Rank" + n }, pNode);
				rank.Position = Dom.Create("div", { "className":"Position" }, rank.Top);
				rank.Icon = Dom.Create("div", { "className":"Icon" }, rank.Top);
				
				rank.Position.innerHTML = n.toString();
				
				for (var i = 0; i <= 3 - n; i++) {
					Dom.Create("div", { "className":"Medal" }, rank.Top);
				}
				
				return rank;
			}
		})
		
		return rankingView;
	})