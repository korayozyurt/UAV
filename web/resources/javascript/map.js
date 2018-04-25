var map;
var polyPath;


function uavMap(){
    var firstPoint = new google.maps.LatLng(36.981175,30.497737);

    var mapCanvas = document.getElementById("google-maps");
    var mapOptions = {center: firstPoint,
        zoom : 15,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI : true
    };
    map = new google.maps.Map(mapCanvas,mapOptions);

    fligthMapSetter();
}


function fligthMapSetter(){
    polyPath = new google.maps.Polyline({
        strokeColor : '#FF3333',
        strokeOpacity : 1.0,
        strokeWeight: 4,
        clickable: true
    });
    polyPath.setMap(map);

    var x = 37.052666;
    var y = 30.622527;

    for(var i=0;i<5;i++){
        var path = polyPath.getPath();
        path.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
        polyPath.setPath(path);
    }

}

function ihaPathAdder(x,y){
    console.log("Coordinate is: " , x , " " , y);
    var path = polyPath.getPath();
    path.push(new google.maps.LatLng(parseFloat(x),parseFloat(y)));
    polyPath.setPath(path);
}






