<%--
  Created by IntelliJ IDEA.
  User: koryOzyurt
  Date: 4/14/2018
  Time: 9:06 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="${pageContext.request.contextPath}/resources/structure/header.jsp"></jsp:include>
</head>
<body>
<jsp:include page="${pageContext.request.contextPath}/resources/structure/navbar.jsp"></jsp:include>

    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
            <div class="container">
                <h3 class="text-muted">Welcome to Red Owl UAV Ground Control System</h3>
            </div>
        </div>
    </div>

    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" href="#ManuelControl" role="tab" >Manuel Control</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#Transportation" role="tab" onclick="transportationClicked();" >Transportation</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#Search" role="tab" >Search</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#Settings" role="tab" >Settings</a>
        </li>
    </ul>

    <!-- tab Panes -->
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="ManuelControl">
            <jsp:include page="${pageContext.request.contextPath}/resources/components/manuel_control.jsp"></jsp:include>
        </div>

        <div role="tabpanel" class="tab-pane" id="Transportation">
            <p>Transportation</p>
            <jsp:include page="${pageContext.request.contextPath}/resources/components/transportation.jsp"></jsp:include>
        </div>

        <div role="tabpanel" class="tab-pane " id="Search">
            <jsp:include page="${pageContext.request.contextPath}/resources/components/uav_search.jsp"></jsp:include>
        </div>

        <div role="tabpanel" class="tab-pane " id="Settings">
            <jsp:include page="${pageContext.request.contextPath}/resources/components/settings.jsp"></jsp:include>
        </div>
    </div>


<jsp:include page="${pageContext.request.contextPath}/resources/structure/footer.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/resources/javascript/uav_index.js"></script>
<script src="${pageContext.request.contextPath}/resources/javascript/manuel_control.js"></script>
<script src="${pageContext.request.contextPath}/resources/javascript/map.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA8Kcc98HO7HDr2dZZ7SkhxiyOqgjQHeE&callback=uavMap"></script>
<script src="${pageContext.request.contextPath}/resources/javascript/webGlUtils/gl-matrix.js"></script>
<script src="${pageContext.request.contextPath}/resources/javascript/webGlUtils/util.js"></script>
<script src="${pageContext.request.contextPath}/resources/javascript/gyroscope.js"></script>
<script src="${pageContext.request.contextPath}/resources/javascript/uav_web_socket.js"></script>
<script src="${pageContext.request.contextPath}/resources/javascript/motor.js"></script>
</body>
</html>















