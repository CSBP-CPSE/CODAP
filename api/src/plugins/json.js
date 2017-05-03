r.define({
    load: function (name, req, onload, config) {		
		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', req.toUrl(name + ".json"));
		
		xhr.onload = function() {
			var pojo = JSON.parse(xhr.responseText);
			
			onload(pojo);
		};
		
		xhr.send();
	}
});