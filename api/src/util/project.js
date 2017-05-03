
r.define(["proj4/proj4"],

	function(Proj4js){

		Proj4js = proj4;
	
		// WGS84 projection
		Proj4js.defs("4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs");

		// LCC projection
		Proj4js.defs("3348", "+proj=lcc +lat_1=49 +lat_2=77 +lat_0=63.390675 +lon_0=-91.86666666666666 +x_0=6200000 +y_0=3000000 +ellps=GRS80 +units=m +no_defs");
		Proj4js.defs("27563", "+title=NTF (Paris)/Lambert Sud France +proj=lcc +lat_1=44.10000000000001 +lat_0=44.10000000000001 +lon_0=0 +k_0=0.9998774990000001 +x_0=600000 +y_0=200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs");
		Proj4js.defs("42304", "+title=Atlas of Canada, LCC +proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs");
		Proj4js.defs("102002",  "+proj=lcc +lat_1=50 +lat_2=70 +lat_0=40 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs");
		Proj4js.defs("3347", "+proj=lcc +lat_1=49 +lat_2=77 +lat_0=63.390675 +lon_0=-91.86666666666666 +x_0=6200000 +y_0=3000000 +ellps=GRS80 +datum=NAD83 +units=m +no_defs");
		
		// Web Mercator projection
		Proj4js.defs("102100", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
		Proj4js.defs("900913", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");

		// Canada Albers Equal Area Conic projection
		Proj4js.defs("102001", "+proj=aea +lat_1=50 +lat_2=70 +lat_0=40 +lon_0=-96 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs");
		
		// Set the error reporting function on the proj4js helper class
		Proj4js.reportError = function (err) { throw "Projection not supported" };
		
		return {
			
			GetProjectionDefinition : function(wkid) {
				var wkid = wkid.toString();
				
				return Proj4js.defs(wkid) || null;
			},
 			
			/**
			 * Projects a point geometry using Proj4js
			 * @method ProjectPoint
			 * @param geo the point geometry to project
			 * @param outSr the destination spatial Reference
			 */
			Point : function(x, y, inWkid, outWkid) {			
				// obtain the proj4js projection object for the  spatial references (wkid first)
				var srcPrj = this.GetProjectionDefinition(inWkid);
				var dstPrj = this.GetProjectionDefinition(outWkid);
				
				var xy = Proj4js(srcPrj, dstPrj, {x: x, y: y});

				return xy;
			}
		};
	});