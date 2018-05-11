<%--
  Created by IntelliJ IDEA.
  User: koryOzyurt
  Date: 5/10/2018
  Time: 4:23 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="search-google-maps" style="widtd:100%; height: 400px;"></div>
<!-- MY API KEY: AIzaSyBA8Kcc98HO7HDr2dZZ7SkhxiyOqgjQHeE -->

<div class="row">
    <div class="col">
        <img src="192.168.1.101/8000" onerror="this.src='/../../resources/assets/no_camera_found.png'"  width="600" height="400">
    </div>
    <div class="col">
        <br><br><br><br>
        <form>
            <div class="form-group">
                <div class="mx-auto" style="width: 30px;">
                    <input class="btn btn-primary" type="button" value="Run Motor">
                </div>
            </div>
            <div class="form-group">
                <div class="mx-auto" style="width: 30px;">
                    <input class="btn btn-primary" type="button" value="Stop Motor">
                </div>
            </div>
        </form>
    </div>
</div>
