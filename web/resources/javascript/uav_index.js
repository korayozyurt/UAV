/*
    koray Ozyurt   
*/


$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
});


function cameraToggle(){
    itemToggle("uav_camera");
}

function mapToggle(){
    itemToggle("google-maps");
}

function gyroscopeToggle(){
    itemToggle("gyro-uav");
}
/*
* item toggle will be used to show or hide some elements
* */
function itemToggle(itemId){
    var item = document.getElementById(itemId);
    if(item.style.display == "none"){
        item.style.display = "block";
    }else{
        item.style.display = "none";
    }
}