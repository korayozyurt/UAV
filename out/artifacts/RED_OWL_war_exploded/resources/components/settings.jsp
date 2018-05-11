<%--
  Created by IntelliJ IDEA.
  User: koryOzyurt
  Date: 5/11/2018
  Time: 5:19 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="row">
    <div class="col-md-4"></div>
    <div class="container">
        <div class="col-d-6">
            <img id="uav_camera" src="192.168.1.101/8000" onerror="this.src='/../../resources/assets/no_camera_found.png'"  width="600" height="400">
        </div>
    </div>
</div>

<div class="container">
    <form>
        <div class="form-group">
            <div class="slidecontainer">
                <h4 class="text-primary">Gamma</h4>
                <input type="range" min="1" max="100" value="50" class="slider" id="gammaRange">
            </div>
        </div>

        <div class="form-group">
            <div class="slidecontainer">
                <h4 class="text-primary">Red</h4>
                <input type="range" min="1" max="100" value="50" class="slider" id="redRange">
            </div>
        </div>

        <div class="form-group">
            <div class="slidecontainer">
                <h4 class="text-primary">Green</h4>
                <input type="range" min="1" max="100" value="50" class="slider" id="greenRange">
            </div>
        </div>

        <div class="form-group">
            <div class="slidecontainer">
                <h4 class="text-primary">Blue</h4>
                <input type="range" min="1" max="100" value="50" class="slider" id="blueRange">
            </div>
        </div>

        <input type="button" class="btn btn-primary" value="SAVE">
    </form>
</div>
