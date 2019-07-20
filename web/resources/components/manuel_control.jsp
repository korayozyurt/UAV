<%@ page import="staticClasses.AttributeNames" %><%--
  Created by IntelliJ IDEA.
  User: koryOzyurt
  Date: 4/17/2018
  Time: 5:12 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<button onclick="mapToggle()" class="btn btn-primary">Show/Hide</button>
<div id="google-maps" style="widtd:100%; height: 400px;"></div>


<div class="row">
    <div class="col">
        <button onclick="cameraToggle()" class="btn btn-primary">Show/Hide</button>
        <img id="uav_camera" src="http://<%=(String)request.getSession().getAttribute(AttributeNames.UAV_HOST_ADDRESS)%>:8000/stream.mjpg" onerror="this.src='/../../resources/assets/no_camera_found.png'"  width="600" height="400">
    </div>
    <div class="col">
        <button onclick="gyroscopeToggle()" class="btn btn-primary">Show/Hide</button>
        <canvas id="gyro-uav" width = "600" height = "400">
            Your browser does not support HTML5
        </canvas>
    </div>
    <div class="col">
        <button onclick="motorToggle()" class="btn btn-primary">Show/Hide</button>
        <canvas id="motor-canvas" width="600" height="400">
            Your Browser does not support the HTML5 canvas Tag
        </canvas>
    </div>
    <div class="col">
        <br><br><br><br>
        <form>
            <div class="form-group">
                <div class="mx-auto" style="width: 30px;">
                    <input class="btn btn-primary" type="button" value="Run Motor" onclick="runMotorCommand()">
                </div>
            </div>
            <div class="form-group">
                <div class="mx-auto" style="width: 30px;">
                    <input class="btn btn-primary" type="button" value="Stop Motor" onclick="stopMotorCommand()">
                </div>
            </div>
        </form>
    </div>
</div>
