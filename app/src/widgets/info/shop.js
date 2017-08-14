
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/plugins/domain!App/config/dom_shop", 
		  "App/widgets/info/info"],
    
	function (Lang,
			  Dom,
			  Array,
			  Dom_Shop,
			  InfoWidget) {

		var shopInfo = Lang.Declare("ShopInfo", [InfoWidget], { 
			
			Build : function() {
				var wdgt = {};
				
				wdgt.LblShop = this.AddLabel("Shop", Lang.Nls("Shop_LabelShop"));
				wdgt.CbxShop = this.AddCombox("shop", "Shop", Dom_Shop);
				
				wdgt.LblName = this.AddLabel("Name", Lang.Nls("Amenity_LabelName"));
				wdgt.IptName = this.AddInput("name", "Name", Lang.Nls("Amenity_PH_Name"));
				
				wdgt.LblAddress = this.AddLabel("Address", Lang.Nls("Building_LabelAddress"));
				wdgt.IptStreet = this.AddInput("addr:street", "Street", Lang.Nls("Building_PH_Street"));
				
				var row1 = this.AddRow();
				
				var gutter1 = this.AddGutter(row1);
				wdgt.IptNumber = this.AddInput("addr:housenumber", "Number", Lang.Nls("Building_PH_Number"), gutter1);
				
				var gutter2 = this.AddGutter(row1);
				wdgt.IptPostal = this.AddInput("addr:postcode", "Postal", Lang.Nls("Building_PH_Postal"), gutter2);
				
				wdgt.LblWebsite = this.AddLabel("Website", Lang.Nls("Shop_LabelWebsite"));
				wdgt.IptWebsite = this.AddInput("website", "Name", Lang.Nls("Shop_PH_Website"));
				
				wdgt.LblPhone = this.AddLabel("Phone", Lang.Nls("Shop_LabelPhone"));
				wdgt.IptPhone = this.AddInput("phone", "Name", Lang.Nls("Shop_PH_Phone"));
				

				return wdgt;
			}
		})
		
		return shopInfo;
	})