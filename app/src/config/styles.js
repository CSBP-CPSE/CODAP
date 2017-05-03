		
r.define([],

	function () {

	    return { 
			Image: new ol.style.Circle({
				radius: 5,
				fill: null,
				stroke: new ol.style.Stroke({
					color: 'red', 
					width: 1
				})
			}),
			
			Point: new ol.style.Style({
				image: new ol.style.Circle({
					radius: 5,
					fill: null,
					stroke: new ol.style.Stroke({
						color: 'red', 
						width: 1
					})
				})
			}),
			
			LineString: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'green',
					width: 1
				})
			}),
			
			MultiLineString: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'green',
					width: 1
				})
			}),
			
			MultiPoint: new ol.style.Style({
				image: new ol.style.Circle({
					radius: 5,
					fill: null,
					stroke: new ol.style.Stroke({
						color: 'red', 
						width: 1
					})
				})
			}),
			
			MultiPolygon: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'yellow',
					width: 1
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 0, 0.1)'
				})
			}),
			
			Polygon: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'rgba(145, 30, 28, 0.8)',
					width: 3
				}),
				fill: new ol.style.Fill({
					color: 'rgba(99, 30, 28, 0.4)'
				})
			}),
			
			GeometryCollection: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'magenta',
					width: 2
				}),
				fill: new ol.style.Fill({
					color: 'magenta'
				}),
				image: new ol.style.Circle({
					radius: 10,
					fill: null,
					stroke: new ol.style.Stroke({
						color: 'magenta'
					})
				})
			}),
			
			Circle: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'red',
					width: 1
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255,0,0,0.2)'
				})
			}),
			
			Search: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'rgba(125,0,0,0.2)',
					width: 1
				}),
				fill: new ol.style.Fill({
					color: 'rgba(255,0,0,0.2)'
				})
			}),
			
			Marker : new ol.style.Style({
				image: new ol.style.Icon({
					anchor: [0.5, 0],
					anchorOrigin : "bottom-left",
					anchorXUnits: 'fraction',
					anchorYUnits: 'fraction',
					opacity: 0.9,
					src: 'assets/location2.png'
				})
			})
		}
	});