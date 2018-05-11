/*
    koray Ozyurt   
*/

var motorCanvas;
var motorCanvasContext;

window.onload = function(){
    drawMotor();
};


function drawMotor(){
    motorCanvas = document.getElementById("motor-canvas");
    motorCanvasContext = motorCanvas.getContext("2d");

    base_image = new Image();
    base_image.src = "/../../resources/assets/quadcopter.png";
    motorCanvasContext.drawImage(base_image,10,10);

    motorCanvasContext.strokeStyle = "#FF0000";
    motorCanvasContext.lineWidth = 10;
}

drawMotor();

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