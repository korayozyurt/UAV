<%--
  Created by IntelliJ IDEA.
  User: koryOzyurt
  Date: 4/17/2018
  Time: 5:12 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="container">
    <button onclick="mapToggle()" class="btn btn-primary">Show/Hide</button>
    <div id="google-maps" style="widtd:100%; height: 400px;"></div>
    <!-- MY API KEY: AIzaSyBA8Kcc98HO7HDr2dZZ7SkhxiyOqgjQHeE -->
<div class="container">
</div>
    <div class="row">
        <div class="col col-md-6">
            <button onclick="cameraToggle()" class="btn btn-primary">Show/Hide</button>
            <img id="uav_camera" src="192.168.1.101/8000" onerror="this.src='/../../resources/assets/no_camera_found.png'"  width="600" height="400">
        </div>
        <div class="col col-md-6">
            <button onclick="gyroscopeToggle()" class="btn btn-primary">Show/Hide</button>
            <canvas id="gyro-uav" width = "600" height = "400">
                Your browser does not support HTML5
            </canvas>
        </div>
    </div>
</div>