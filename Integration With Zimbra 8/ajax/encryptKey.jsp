<%@ page buffer="8kb" autoFlush="true"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page import="asia.ecoit.security.Encrypt" %>
<%
 String uid = request.getParameter("uid");
 pageContext.setAttribute("uid",uid);
 String key = request.getParameter("randomKey");
%>

<sql:setDataSource var="dataSource" driver="com.mysql.jdbc.Driver"
				url="jdbc:mysql://localhost:7306/zimbra" user="zimbra"
				password="zgmWfc6K8sZEQ2aa8Ovygh2NVA" />
			<sql:query dataSource="${dataSource}" var="result">
			      SELECT * FROM mailbox  where comment='${uid}' and public_key!='';
</sql:query>
<c:set var="public_key" value="${fn:trim(result.rows[0].public_key)}" />
<%
try{
    String publicKey = (String) pageContext.getAttribute("public_key");
	Encrypt e = new Encrypt();
	String desKey = e.encrypt(key, publicKey);
	out.print(desKey);
}catch(Exception ex){
	out.println(ex.toString());
}
	
%>