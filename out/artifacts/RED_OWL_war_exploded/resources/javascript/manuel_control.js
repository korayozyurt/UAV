/*
    koray Ozyurt   
*/
/**
 * message will be sent by this function
 * create a variable as message
 * and fill by the pressed button
 */
document.addEventListener('keydown',function(event){
    console.log("key pressed");
    var message = "";
    //left arow is pressed
    if(event.keyCode == 52){
        message = "rotate left";
    //up arrow
    }else if(event.keyCode == 56){
        message = "move up";
    //right arrow
    }else if(event.keyCode == 54){
        message = "rotate right";
    //down arrow
    }else if(event.keyCode == 50){
        message = "move down";
    //A is pressed
    }else if(event.keyCode == 65){
        //A is pressed
    //D is pressed
    }else if(event.keyCode == 68){
        //D is pressed
    //W is pressed
    }else if(event.keyCode == 87){
        //W is pressed
    //S is pressed
    }else if(event.keyCode == 83){
        //S is pressed
    }
    $.ajax({
        type : 'POST',
        url : 'SocketTX',
        data : {message : message}
    });
    message = "";
});

function runMotorCommand(){
    message = "run_motor";
    $.ajax({
        type : 'POST',
        url : 'SocketTX',
        data : {message : message}
    });
    message = "";
}

function stopMotorCommand(){
    message = "stop_motor";
    $.ajax({
        type : 'POST',
        url : 'SocketTX',
        data : {message : message}
    });
    message = "";
}
