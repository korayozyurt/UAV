var map;
var transportation_map;
var search_map;

var polyPath;
var transportationMapPath;
var searchMapPath;
var destinationPath;

var beachMarker;


function uavMap(){
    var firstPoint = new google.maps.LatLng(37.052624,30.622771);

    var mapCanvas = document.getElementById("google-maps");
    var transportationCanvas = document.getElementById("transportation-google-maps");
    var searchMapCanvas = document.getElementById("search-google-maps");

    var mapOptions = {center: firstPoint,
        zoom : 15,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI : true
    };
    map = new google.maps.Map(mapCanvas,mapOptions);

    transportation_map = new google.maps.Map(transportationCanvas,mapOptions);

    search_map = new google.maps.Map(searchMapCanvas,mapOptions);

    beachMarker = new google.maps.Marker({
        map: null
    });
    var destinationPath = new google.maps.Polyline({
    });

    google.maps.event.addListener(transportation_map,'click',function(event){
        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        beachMarker.setMap(null);
        beachMarker = new google.maps.Marker({
            position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
            map: transportation_map,
            icon: image
        });
        var path = transportationMapPath.getPath();
        var destination = [
            path.pop(),
            {lat: event.latLng.lat(), lng: event.latLng.lng()}
        ];
        destinationPath.setMap(null);
        destinationPath = new google.maps.Polyline({
            path: destination,
            geodesic: true,
            strokeColor: '#30ff09',
            strokeOpacity : 1.0,
            strokeWeight: 4
        });
        destinationPath.setMap(transportation_map);
    });

    fligthMapSetter();
}


function fligthMapSetter(){
    polyPath = new google.maps.Polyline({
        strokeColor : '#FF3333',
        strokeOpacity : 1.0,
        strokeWeight: 4,
        clickable: true
    });

    transportationMapPath = new google.maps.Polyline({
        strokeColor : '#FF3333',
        strokeOpacity : 1.0,
        strokeWeight: 4,
        clickable: true
    });

    searchMapPath = new google.maps.Polyline({
        strokeColor : '#FF3333',
        strokeOpacity : 1.0,
        strokeWeight: 4,
        clickable: true
    });

    polyPath.setMap(map);
    transportationMapPath.setMap(transportation_map);
    searchMapPath.setMap(search_map);

    var x = 37.052624;
    var y = 30.622771;

    for(var i=0;i<5;i++){
        var path = polyPath.getPath();
        path.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
        polyPath.setPath(path);

        var transportationPath = transportationMapPath.getPath();
        transportationPath.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
        transportationMapPath.setPath(transportationPath);

        var searchPath = searchMapPath.getPath();
        searchPath.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
        searchMapPath.setPath(searchPath)
    }

}

function ihaPathAdder(x,y){
    console.log("Coordinate is: " , x , " " , y);
    var path = polyPath.getPath();
    path.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
    polyPath.setPath(path);

    var transportationPath = transportationMapPath.getPath();
    transportationPath.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
    transportationMapPath.setPath(transportationPath);

    var searchPath = searchMapPath.getPath();
    searchPath.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
    searchMapPath.setPath(searchPath)
}




