<%@ page import="staticClasses.AttributeNames" %><%--
  Created by IntelliJ IDEA.
  User: koryOzyurt
  Date: 4/14/2018
  Time: 7:00 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
        <%
            try{
                String warning = (String)request.getSession().getAttribute(AttributeNames.WARNING_MESSAGE);
                if(!warning.equals("")){
                    out.print("<p class = text-danger>");
                    out.print(warning);
                    out.print("</p>");
                }
            }catch (NullPointerException e){
                System.out.println("There is no warning message");
            }
        %>
    </div>
</div>