
r.define(["Api/util/lang",
		  "Api/util/dom",
		  "Api/util/array",
		  "Api/plugins/domain!App/config/dom_access", 
		  "Api/plugins/domain!App/config/dom_building", 
		  "App/widgets/info/info"],
    
	function (Lang,
			  Dom,
			  Array,
			  Dom_Access,
			  Dom_Building,
			  InfoWidget) {

		var buildingInfo = Lang.Declare("BuildingInfo", [InfoWidget], { 
			
			Build : function(domNode) {
				
				var wdgt = {};
				
				wdgt.LblBuilding = this.AddLabel("Building", Lang.Nls("Building_LabelBuilding"));
				wdgt.CbxBuilding = this.AddCombox("building", "Building", Dom_Building);
				wdgt.LblAddress = this.AddLabel("Address", Lang.Nls("Building_LabelAddress"));
				wdgt.IptStreet = this.AddInput("addr:street", "Street", Lang.Nls("Building_PH_Street"));
				
				var row1 = this.AddRow();
				
				var gutter1 = this.AddGutter(row1);
				wdgt.IptNumber = this.AddInput("addr:housenumber", "Number", Lang.Nls("Building_PH_Number"), gutter1);
				
				var gutter2 = this.AddGutter(row1);
				wdgt.IptPostal = this.AddInput("addr:postcode", "Postal", Lang.Nls("Building_PH_Postal"), gutter2);
				
				wdgt.LblAccess = this.AddLabel("Accessible", Lang.Nls("Building_LabelAccess"));
				wdgt.CbxAccess = this.AddCombox("wheelchair", "Access", Dom_Access);
				wdgt.IptDescr = this.AddInput("note", "Description", Lang.Nls("Building_PH_Descr"));
				
				wdgt.LblSource = this.AddLabel("Source", Lang.Nls("Building_LabelSource"));
				wdgt.IptSource = this.AddInput("source", "Source", Lang.Nls("Building_PH_Source"));
				
				wdgt.LblFixme = this.AddLabel("Fixme", Lang.Nls("Building_LabelFixme"));
				wdgt.IptFixme = this.AddInput("fixme", "Fixme", Lang.Nls("Building_PH_Fixme"));
				
				return wdgt;
			}
		})
		
		return buildingInfo;
	})