<%@ page buffer="8kb" autoFlush="true"%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@page import="asia.ecoit.security.Encrypt" %>

<%@ page import="com.zimbra.cs.account.Provisioning"%>
<%@ page import="com.zimbra.cs.account.Provisioning.AccountBy"%>
<%@ page import="com.zimbra.cs.account.Account"%>
<%@ page import="com.zimbra.cs.account.AuthToken"%>

<sql:setDataSource var="dataSource" driver="com.mysql.jdbc.Driver"
				url="jdbc:mysql://localhost:7306/zimbra" user="zimbra"
				password="zgmWfc6K8sZEQ2aa8Ovygh2NVA" />
<%
int check = 1;
try{
	Cookie[] cookies = request.getCookies();
    String authTokenString = "";
    for (Cookie cooky : cookies) {
        if (cooky.getName().equals("ZM_AUTH_TOKEN")) {
            authTokenString = cooky.getValue();
        }
    }
	AuthToken authToken = AuthToken.getAuthToken(authTokenString);
  	Account acct = Provisioning.getInstance().get(AccountBy.id, authToken.getAccountId());
  	if (!acct.isIsAdminAccount()) check=0;
}catch (Exception ex){
	check=0;
}
%>
<%
if (check==1){
%>
<%
 String uid = request.getParameter("uid");
 pageContext.setAttribute("uid",uid);
 String publickey = request.getParameter("publickey");
 pageContext.setAttribute("public_key",publickey);
%>


<sql:update dataSource="${dataSource}" var="result">
      UPDATE mailbox SET public_key='${public_key }' where id='${uid}';
</sql:update>
<%
}else{
	 String name = null;
	 Provisioning prov = Provisioning.getInstance();
	 javax.servlet.http.Cookie[] cookies = request.getCookies();
	 String authTokenString = "";
	 Account acct = null;
		
	 for (javax.servlet.http.Cookie cookie : cookies) {
		   if (cookie.getName().equals("ZM_AUTH_TOKEN")) {
		      authTokenString = cookie.getValue();
		   }
	 }
		
	 if (!authTokenString.equals("")) {
		   AuthToken authToken = AuthToken.getAuthToken(authTokenString);
		   acct = prov.get(Provisioning.AccountBy.id, authToken.getAccountId());
	 }
		
	 if (acct != null) {
		    name = acct.getName();
	 }	 
	 pageContext.setAttribute("comment",name);
	 String publickey = request.getParameter("publickey");
	 pageContext.setAttribute("public_key",publickey);
%>
	<sql:update dataSource="${dataSource}" var="result">
      UPDATE mailbox SET public_key='${public_key }' where comment='${comment}';
	</sql:update>
<%
}
%>