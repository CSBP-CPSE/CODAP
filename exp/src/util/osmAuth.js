
r.define(["Api/components/promise"],

	function (Promise) {

	    return { 
            
			_auth : null,
			
			Initialize : function(options) {
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
			}
		}
	})