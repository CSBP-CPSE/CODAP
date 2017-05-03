r.define({
    load: function (name, req, onload, config) {		
		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', req.toUrl(name + ".txt"));
		
		xhr.onload = function() {			
			onload(xhr.responseText);
		};
		
		xhr.send();
	}
});