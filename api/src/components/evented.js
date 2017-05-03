
r.define(["Api/util/lang"],
    
	function (Lang) {

		var Evented = Lang.Declare("Evented", null, { 
			
			listeners : null,
			
			constructor : function() {
				this.listeners = {};
			},
			
			addEventListener : function(type, callback, once){
				if (!(type in this.listeners)) this.listeners[type] = [];
				
				this.listeners[type].push({ callback:callback, once:!!once });
			},
			
			removeEventListener : function(type, callback){
				if (!(type in this.listeners)) return;
			  
				var stack = this.listeners[type];
				  
				for (var i = 0, l = stack.length; i < l; i++){
					if (stack[i].callback === callback){
						stack.splice(i, 1);
						
						return this.removeEventListener(type, callback);
					}
				}
			},
				
			dispatchEvent : function(event){
				if (!(event.type in this.listeners)) return;

				var stack = this.listeners[event.type];

				event.target = this;

				for (var i = 0; i < stack.length; i++) {
					stack[i].callback.call(this, event);
				}
				
				for (var i = stack.length - 1; i >= 0; i--) {
					if (!!stack[i].once) this.removeEventListener(event.type, stack[i].callback);
				}
			},
			
			emit : function(type, data) {
				var event = { type:type, bubbles:true, cancelable:true };
			
				Lang.Mixin(event, data);
				
				this.dispatchEvent(event);
			},
			
			on : function(type, callback) {
				this.addEventListener(type, callback, false);
			},
			
			once : function(type, callback) {
				this.addEventListener(type, callback, true);
			}
		})
		
		return Evented;
	})