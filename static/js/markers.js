$(document).ready(function () {

  
    $("#map").css({
		height: 500,
		width: 600
  });
    
	var myLatLng = new google.maps.LatLng(-29.857117, 31.031663999999978);
     MYMAP.init('#map', myLatLng, 50);
  
 
		MYMAP.placeMarkers('static/markers.xml');

});

var MYMAP = {
    map: null,
    bounds: null
};

var last_marker = {
    map: null,
    marker : null
};

MYMAP.init = function(selector, latLng, zoom) {
    var myOptions = {
        zoom: zoom,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map($(selector)[0], myOptions);
    this.bounds = new google.maps.LatLngBounds();
};

MYMAP.placeMarkers = function (filename) {
    
    $.get(filename, function(xml) {
        $(xml).find("marker").each(function() {
            var name = $(this).find('name').text();
            var address = $(this).find('address').text();
            var history_header = $(this).find("history header").text();
            var history_content = $(this).find("history content").text();

            // create a new LatLng point for the marker
            var lat = $(this).find('lat').text();
            var lng = $(this).find('lng').text();
            var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

            // extend the bounds to include the new point
            MYMAP.bounds.extend(point);

            var marker = new google.maps.Marker({
                position: point,
                map: MYMAP.map
            });

            var infoWindow = new google.maps.InfoWindow();
            var html = '<strong>' + name + '</strong.><br />' + address;
            google.maps.event.addListener(marker, 'click', function () {

                if (last_marker.map && last_marker.marker) {
                    infoWindow.close(last_marker.map, last_marker.marker);
                    console.log(last_marker," << closing");
                }

                infoWindow.setContent(html);
                infoWindow.open(MYMAP.map, marker);
               
                last_marker.map = MYMAP.map;
                last_marker.marker = marker;
                console.log(infoWindow);
                $("#place_name").text(name);
                $("#place_address").text(address);
                $("#history_header").text(history_header);
                $("#history_content").text(history_content);
            });
            MYMAP.map.fitBounds(MYMAP.bounds);
        });
    });
};