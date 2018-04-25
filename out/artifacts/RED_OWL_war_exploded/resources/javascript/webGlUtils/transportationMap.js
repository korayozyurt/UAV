/*
    koray Ozyurt   
*/

var map;


function uavMap(){
    var firstPoint = new google.maps.LatLng(36.981175,30.497737);

    var mapCanvas = document.getElementById("transportation-map");
    var mapOptions = {center: firstPoint,
        zoom : 15,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI : true
    };
    map = new google.maps.Map(mapCanvas,mapOptions);

}
