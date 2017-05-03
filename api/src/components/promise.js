
r.define(["Api/util/lang"],
    
	function (Lang) {

		var promise = Lang.Declare("Promise", null, { 
		
			_thens : null,
			_outcome : null,
		
			isResolved : false,
			isRejected : false,
		
			constructor : function() {
				this._thens = [];
			},
			
			then : function(onResolve, onReject) {
				this._thens.push({ Resolve: onResolve, Reject: onReject });
				
				if (this.isResolved) onResolve(this._outcome);
				if (this.isRejected) onReject(this._outcome);
			},
			
			Resolve : function(result) {
				if (this.isResolved) {
					this.Reject(new Error('Promise already resolved.'));
					
					return;
				}
				
				for (var i = 0; i < this._thens.length; i++) {
					if (!this._thens[0].Resolve) continue;
					
					this._thens[0].Resolve(result);
				}
				
				this.isResolved = true;
				this._outcome = result;
				// this._thens = null;
			},
			
			Reject : function(error) {
				for (var i = 0; i < this._thens.length; i++) {
					if (!this._thens[0].Reject) continue;
					
					this._thens[0].Reject(error);
				}
				
				this.isRejected = true;
				this._outcome = error;
			}
		})
		
		promise.List = function(promises) {
			var results = [], errors = [];
			var prom = new promise();
		
			for (var i = 0; i < promises.length; i++) {
				promises[i].then(onResolved, onRejected);
			}
			
			return prom;
			
			function onResolved(result) {
				tryFinish({ state:"resolved", result:result });	
			}
			
			function onRejected(error) {
				prom.Reject(error);

				tryFinish({ state:"rejected", error:error });	
			}
			
			function tryFinish(outcome) {
				results.push(outcome); 
				
				if (results.length === promises.length) prom.Resolve(results);
			}
		}
		
		return promise;
	})