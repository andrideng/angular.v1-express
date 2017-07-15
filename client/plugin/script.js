$(document).ready(function() {
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: {lat: -6.21462, lng: 106.84513},
      zoom: 13
    });

	var input = document.getElementById('autocomplete');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var marker = new google.maps.Marker({
		map: map,
    });

    autocomplete.addListener('place_changed', function() {
		marker.setVisible(false);
		var place = autocomplete.getPlace();

		$('input[name="name"]').val(place.name);
		$('input[name="lat"]').val(place.geometry.location.lat());
		$('input[name="lng"]').val(place.geometry.location.lng());
		$('textarea[name="formatted_address"]').val(place.vicinity);


		// If the place has a geometry, then present it on a map.
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}
		marker.setPosition(place.geometry.location);
		marker.setVisible(true);

    });

	
});