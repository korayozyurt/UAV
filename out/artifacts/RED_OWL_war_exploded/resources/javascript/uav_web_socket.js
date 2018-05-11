/*
    koray Ozyurt   
*/

var webSocket = new WebSocket("ws://" + window.location.host + "/UAVWebSocketEndPoint");


$(document).ready(function(){
   webSocket.onopen = function (ev) {
       console.log("web socket is connected...");
   };
});

/*

    Example of coming data:
    {'mpu6050_x': 7, 'mpu6050_y': 41, 'gps_x': 39, 'gps_y': 41}

 */

$(document).ready(function () {
   webSocket.onmessage = function (ev) {
       var message = ev.data;
       var messageJson = JSON.parse(message);
       console.log("message json is: ", messageJson);
       var mpu6050_x = messageJson.mpu6050_x;
       var mpu6050_y = messageJson.mpu6050_y;
       var gps_x = messageJson.gps_x;
       var gps_y = messageJson.gps_y;
       /*
       * Set the x and y rotation
       * */
       setX(mpu6050_x);
       setY(mpu6050_y);
       /**
        * Set the ihaPath
        */
       ihaPathAdder(gps_x,gps_y);

       drawForwardLeft();
       drawForwardRight();
       drawBackLeft();
       drawBackRight();

       console.log("web socket message is: " + message);
   };
});

//on close document must be already ready
webSocket.onclose = function (ev) {
    console.log("web socket is closed");
};

webSocket.onerror = function (ev) {
    console.log("web socket error!");
};


//ajax post method access the SocketTXServlet
function socketTX(message){

}
