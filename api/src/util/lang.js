 r.define(["Api/util/array"],

    function (Array) {

		return {
			
	        nls : null,

	        locale : "en",
			
			set : function(prop, value) {
				this[prop] = value;
			},
			
			Declare : function(name, parents, proto) {
				// Build a function that merges constructors of all parent classes
				function DerivedClass() {
					// Run all parent constructors
					for (var i = 0; !!parents && i < parents.length; i++) {
						parents[i].prototype.constructor.apply(this, arguments);
					}
					
					// Run current class constructor
					proto.constructor.apply(this, arguments);
				}
				
				// Mixin all parents function to class 
				for (var i = 0; !!parents && i < parents.length; i++) {
					this.Mixin(DerivedClass.prototype, parents[i].prototype);
				}
				
				// Define declared class for type identification
				DerivedClass.prototype.declaredClass = name;
				
				// Mixin current class prototype into derived class, this gives priority to current class definition
				this.Mixin(DerivedClass.prototype, proto);
				
				// Set real constructor of current class to the merged constructor so constructors will chain through inheritance
				DerivedClass.prototype.constructor = DerivedClass;
				
				return DerivedClass;				
			},
			
			Mixin : function(a, b) {				
				for (var key in b) {
					if (b.hasOwnProperty(key)) a[key] = b[key];
				}

				return arguments[0];
			},
			 
		    // debouncing function from John Hann, slightly modified 
		    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
			Debounce : function(func, threshold) {
				var timeout;
			
				return function debounced () {
					
					function delayed () {
						func.apply(this, arguments);
						
						timeout = null; 
					};
			 
					if (timeout) clearTimeout(timeout);
			 
					timeout = setTimeout(delayed.bind(this), threshold || 100); 
				};
			},
			
			Nls : function(id, subs, locale) {
	            if (!this.nls) throw "Nls content not set.";
				
				var itm = this.nls[id];

	            if (!itm) throw "Nls String '" + id + "' undefined.";

	            var txt = itm[(locale) ? locale : this.locale];

	            if (txt === undefined || txt === null) throw "String does not exist for requested language.";

	            return (!!subs && subs.length > 0) ? String.Format(txt, subs) : txt;
			}
		}
	});
