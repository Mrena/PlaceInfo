//logic
; (function () {


    $(".app_name").text("PlaceInfo");

    $("#change_view").on("vclick", function (e) {

        if ($("#top_info").html().trim() !== "") {
            
            $("#bottom_info").html($("#top_info").html());
            $("#top_info").html("");

        } else {
            
            $("#top_info").html($("#bottom_info").html());
            $("#bottom_info").html("");

        }

        e.preventDefault();
    });

    var Map = function () {

        var bounds = null,
            map = null,        
            init = function(lat_long, selector) {

                var options = {
                    zoom: zoom,
                    center: lat_long,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.map = new google.maps.Map(selector[0], options);

                this.bound = new google.maps.LatLngBounds();

            },
            placeMakers = function(filename) {


                $.get(filename, function (xml) {
                    

                });
            };

        return {
            init: init,
            placeMarkers: placeMarkers
        };


    };


}());