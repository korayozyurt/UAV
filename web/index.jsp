<%@ page import="staticClasses.AttributeNames" %><%--
  Created by IntelliJ IDEA.
  User: koryOzyurt
  Date: 4/13/2018
  Time: 9:31 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <jsp:include page="${pageContext.request.contextPath}/resources/structure/header.jsp"></jsp:include>
</head>
<body>
<jsp:include page="${pageContext.request.contextPath}/resources/structure/navbar.jsp"></jsp:include>

  <br><br><br><br>

  <div class="row">
    <div class="col-md-5"></div>
    <div class="col-md-5">
      <h3 class="text-muted">RED-OWL DRONE</h3>
    </div>
  </div>

  <div class="container">
    <form method="post" action="index">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" class="form-control" id="username" name="<%=AttributeNames.USER_NAME%>" placeholder="Username">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" class="form-control" id="password" name="<%=AttributeNames.PASSWORD%>" placeholder="Password">
      </div>

      <div class="row">
        <div class="col-md-5"></div>
        <div class="col-md-5">
          <button type="submit" class="btn btn-primary">Login</button>
          <br>
        </div>
      </div>
    </form>
    <jsp:include page="${pageContext.request.contextPath}/resources/error/warning_messages.jsp"></jsp:include> <!-- show if there is any warning message -->
  </div>



<jsp:include page="${pageContext.request.contextPath}/resources/structure/footer.jsp"></jsp:include>
<script src="${pageContext.request.contextPath}/resources/javascript/uav_web_socket.js"></script>
</body>
</html>