/*
    koray Ozyurt   
*/

var motorCanvas;
var motorCanvasContext;

window.onload = function(){
    motorCanvas = document.getElementById("motor-canvas");
    motorCanvasContext = motorCanvas.getContext("2d");

    motorCanvasContext.strokeStyle = "#FF0000";
    motorCanvasContext.lineWidth = 10;
    drawMotor();
};


function drawMotor(){

    base_image = new Image();
    base_image.src = "/../../resources/assets/quadcopter.png";
    motorCanvasContext.drawImage(base_image,10,10);

}

function writeThrottleOffset(throttleOffset){
    motorCanvasContext.font = "16px Comic Sans MS";
    motorCanvasContext.fillStyle = "red";
    motorCanvasContext.TextAlign = "center";
    var text = throttleOffset.toString();
    text = "throttle offset: " + text;
    motorCanvasContext.fillText(text,375,250);
}

function drawForwardLeft(){
    motorCanvasContext.beginPath();
    motorCanvasContext.arc(95,70,40,0,2*Math.PI);
    motorCanvasContext.stroke();

    drawMotor();
}

function drawForwardRight(){
    motorCanvasContext.beginPath();
    motorCanvasContext.arc(515,85,40,0,2*Math.PI);
    motorCanvasContext.stroke();
    drawMotor();
}

function drawBackLeft(){
    motorCanvasContext.beginPath();
    motorCanvasContext.arc(87,365,40,0,2*Math.PI);
    motorCanvasContext.stroke();
    drawMotor();
}

function drawBackRight(){
    motorCanvasContext.beginPath();
    motorCanvasContext.arc(515,355,40,0,2*Math.PI);
    motorCanvasContext.stroke();
    drawMotor();
}

function clearCanvas(){
    motorCanvasContext.clearRect(0,0,motorCanvas.width, motorCanvas.height);
    drawMotor();
}