/*
    koray Ozyurt   
*/

var webSocket = new WebSocket("ws://" + window.location.host + "/UAVWebSocketEndPoint");


$(document).ready(function(){
   webSocket.onopen = function (ev) {
       console.log("web socket is connected...");
   };
});

$(document).ready(function () {
   webSocket.onmessage = function (ev) {
       console.log("web socket message is: " + ev.data);
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
    $.ajax({
       type : 'POST',
       url : 'SocketTX',
       data : {message : message}
    });
}
