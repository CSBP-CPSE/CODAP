
r.define([],

	function () {

	    return { 
            Format: function (str, subs) {
                var s = str;

                for (var i = 0; i < subs.length; i++) {
                    var reg = new RegExp("\\{" + i + "\\}", "gm");
                    s = s.replace(reg, subs[i]);
                }

                return s;
            }
		}
	})