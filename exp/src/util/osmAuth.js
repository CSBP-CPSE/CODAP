
r.define(["Api/components/promise",
		  "Exp/util/osmXml",
		  "Api/util/string"],

	function (Promise,
			  OsmXml,
			  String) {

	    return { 
            
			_auth : null,
			
			oauth_secret : null,
			oauth_consumer_key : null,
			url : null,
			
			Initialize : function(options) {
				this.url = options.url || 'https://www.openstreetmap.org';
				this.oauth_secret = options.oauth_secret;
				this.oauth_consumer_key = options.oauth_consumer_key;
				
				this._auth = osmAuth(options);
			},
			
			Authenticate : function() {
				var p = new Promise();
				
				this._auth.authenticate(function() {
					p.Resolve({ status:"login success" });
				}.bind(this));
				
				return p;
			},
			
			Logout : function() {
				this._auth.logout();			
			},
			
			IsAuthenticated : function() {
				return this._auth.authenticated();
			},
			
			GetUserDetails : function() {
				var p = new Promise();
				var opts = { method: 'GET', path: '/api/0.6/user/details' };
				
				this._auth.xhr(opts, function(err, result) {
					(!!err) ? p.Reject(err) : p.Resolve(process(result));
				});
				
				return p;
				
				function process(res) {
					var user = res.getElementsByTagName('user')[0];
					var changesets = res.getElementsByTagName('changesets')[0];
					
					return {
						id		: user.getAttribute('id'),
						name	: user.getAttribute('display_name'),
						changes	: changesets.getAttribute('count')
					};
				}
			},
			
			GetFeaturesInBBox : function(extent) {
				var p = new Promise();
				var opts = { method: 'GET', path:  "/api/0.6/map?bbox=" + extent.join(",") };
				
				this._auth.xhr(opts, function(err, result) {
					(!!err) ? p.Reject(err) : p.Resolve(process(result));
				});
				
				return p;
				
				function process(res) {
					return res;
				}
			},
			
			OpenChangeset : function(){
				var p = new Promise();
					
				this._auth.xhr({
					method: 'PUT',
					path: '/api/0.6/changeset/create',
					options: { header: { 'Content-Type': 'text/xml' } },
					content: OsmXml.Changeset_Create()
				}, done);
				
				return p;
				
				function done(err, id) {					
					(err) ? p.Reject(err) : p.Resolve({ changeset:{ id:id, state:"open" }});
				}
			},
			
			CloseChangeset : function(id){
				var p = new Promise();
				var path = String.Format("/api/0.6/changeset/{0}/close", [id]);
				
				this._auth.xhr({
					method: 'PUT',
					path: path,
					options: { header: { 'Content-Type': 'text/xml' } }
				}, done);
				
				return p;
				
				function done(err) {
					(err) ? p.Reject(err) : p.Resolve({ changeset:{ id:id, state:"closed" }});
				}
			},
			
			// TODO : This function is specific for tags on way objects, it should be more generic. No time.
			UploadChangeset : function(id, feature) {
				var p = new Promise();
				var path = String.Format("/api/0.6/changeset/{0}/upload", [id]);
				
				this._auth.xhr({
					method: 'POST',
					path: path,
					options: { header: { 'Content-Type': 'text/xml' } },
					content: OsmXml.Changeset_Modify_WayTags(id, feature)
				}, done);
				
				return p;
				
				function done(err) {
					(err) ? p.Reject(err) : p.Resolve({ changeset:{ id:id, state:"closed" }});
				}
			}
		}
	})