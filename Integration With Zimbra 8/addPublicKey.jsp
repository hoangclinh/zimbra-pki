<html>
<head>
	<meta charset="utf-8">
</head>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page import="com.zimbra.cs.account.*,com.zimbra.common.account.Key.AccountBy, com.zimbra.cs.zimlet.*"%>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="http://java.com/js/deployJava.js"></script>
	<script> 
        var attributes = {id:'caApplet',
        		code : 'com.ecoit.asia.EcoitApplet',  width:300, height:300} ; 
        var parameters = {jnlp_href: '/zimbra/public/ecoit_plugin50/CAAppletSimple.jnlp'} ;        
        deployJava.runApplet(attributes, parameters, '1.7'); 
    </script>
<div id="public_key_div"> 
	<form method="POST" id="public_key_form">
		Hệ thống đã tìm thấy PublicKey của bạn. Nhấn vào Đồng ý để tiếp tục<input
			type="hidden" name="txtPublicKey" id="txtPublicKey"> <input
			type="submit" value="Đồng ý">
	</form>
</div>
<%
if (true) {
    // ...
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
		   acct = prov.get(AccountBy.id, authToken.getAccountId());
		}
		
		if (acct != null) {
		    name = acct.getName();
		}
		out.print(name);
		pageContext.setAttribute("submited",request.getMethod());
		pageContext.setAttribute("name",name);
		String public_key = request.getParameter("txtPublicKey");
		//public_key="sdgsdg";
		if (public_key!=null) public_key = public_key.trim();
		pageContext.setAttribute("public_key",public_key);
}
%>
<script>
	$(document).ready( function(){
		document.getElementById('txtPublicKey').value = document.caApplet.getCertificate();
		if (document.caApplet.getCertificate()==null){
			document.getElementById('public_key_form').style.display="none";
			document.getElementById('public_key_div').innerHTML = "Chua nhan duoc Token";
		}
	});
	
</script>

<sql:setDataSource var="dataSource" driver="com.mysql.jdbc.Driver"
	url="jdbc:mysql://localhost:7306/zimbra" user="zimbra"
	password="R_AoPF52Hv.ejQ.3vc43sdbAoV"/>
<sql:update dataSource="${dataSource}" var="result">
      UPDATE mailbox SET public_key='${public_key }' where comment='${name}';
</sql:update>
<c:if test="${submited == 'POST'}">
	<script>
	//	window.close();
	</script>
</c:if>

</html>
