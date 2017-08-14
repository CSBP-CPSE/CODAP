
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/plugins/domain!App/config/dom_amenity", 
		  "App/widgets/info/info"],
    
	function (Lang,
			  Dom,
			  Array,
			  Dom_Amenity,
			  InfoWidget) {

		var amenityInfo = Lang.Declare("AmenityInfo", [InfoWidget], { 
			
			Build : function() {
				var wdgt = {};
				
				wdgt.LblAmenity = this.AddLabel("Amenity", Lang.Nls("Amenity_LabelAmenity"));
				wdgt.CbxAmenity = this.AddCombox("amenity", "Amenity", Dom_Amenity);
				
				wdgt.LblName = this.AddLabel("Name", Lang.Nls("Amenity_LabelName"));
				wdgt.IptName = this.AddInput("name", "Name", Lang.Nls("Amenity_PH_Name"));
				
				wdgt.LblAddress = this.AddLabel("Address", Lang.Nls("Building_LabelAddress"));
				wdgt.IptStreet = this.AddInput("addr:street", "Street", Lang.Nls("Building_PH_Street"));
				
				var row1 = this.AddRow();
				
				var gutter1 = this.AddGutter(row1);
				wdgt.IptNumber = this.AddInput("addr:housenumber", "Number", Lang.Nls("Building_PH_Number"), gutter1);
				
				var gutter2 = this.AddGutter(row1);
				wdgt.IptPostal = this.AddInput("addr:postcode", "Postal", Lang.Nls("Building_PH_Postal"), gutter2);
				
				wdgt.LblName = this.AddLabel("Website", Lang.Nls("Amenity_LabelWebsite"));
				wdgt.IptName = this.AddInput("website", "Name", Lang.Nls("Amenity_PH_Website"));
				
				wdgt.LblName = this.AddLabel("Phone", Lang.Nls("Amenity_LabelPhone"));
				wdgt.IptName = this.AddInput("phone", "Name", Lang.Nls("Amenity_PH_Phone"));
				
				return wdgt;
			}
		})
		
		return amenityInfo;
	})
	