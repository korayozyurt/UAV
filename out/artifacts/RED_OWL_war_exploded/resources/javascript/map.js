var map;
var polyPath;


/*
var locationFunction = function() {
    var x = $('#x').val(),
        y = $('#y').val();
    $.ajax({
        type: 'POST',
        data: {x: x, y:y},
        url: 'Location',
        success: function (responseText) {
            $("#location-ajax-message").html(responseText);
            var numbersArray = responseText.split(" ");
            var locations = [];
            for (var i in numbersArray){
                if(parseFloat(numbersArray[i].match(/(\d+)(\.\d+)?/g))){
                    locations.push(numbersArray[i]);
                    console.log("extracted number is: ",numbersArray[i]);
                }
            }
            x = locations[0];
            y = locations[1];
            ihaPathAdder(x,y);
        }
    });
};
*/

function uavMap(){
    var firstPoint = new google.maps.LatLng(36.981175,30.497737);

    var mapCanvas = document.getElementById("google-maps");
    var mapOptions = {center: firstPoint,
        zoom : 15,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI : true
    };
    map = new google.maps.Map(mapCanvas,mapOptions);

    flithMapSetter();
}

function flithMapSetter(){
    polyPath = new google.maps.Polyline({
        strokeColor : '#FF3333',
        strokeOpacity : 1.0,
        strokeWeight: 4,
        clickable: true
    });
    polyPath.setMap(map);

    var x = 36.981175;
    var y = 30.497737;

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






