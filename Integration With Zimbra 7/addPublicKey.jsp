<html>
<head>
	<meta charset="utf-8">
</head>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page import="com.zimbra.cs.account.*, com.zimbra.cs.zimlet.*"%>
<APPLET CODE="com.ecoit.ca.applet.SampleApplet.class"
	archive="sCAApplet.jar,lib/bcprov-jdk.jar,lib/itext-xtra-5.1.3.jar,lib/poi-excelant-3.9-20121203.jar,lib/commons-codec-1.5.jar,lib/jacob-1.14.3.jar,lib/poi-ooxml-3.9-20121203.jar,lib/commons-logging-1.1.jar,lib/jaxen-1.1.jar,lib/poi-ooxml-schemas-3.9-20121203.jar,lib/commons-net-3.2.jar,lib/log4j-1.2.13.jar,lib/poi-scratchpad-3.9-20121203.jar,lib/dom4j-1.6.1.jar,lib/openxml4j-sig.jar,lib/stax-api-1.0.1.jar,lib/itext-2.1.7.jar,lib/poi-3.9-20121203.jar,lib/xmlbeans-2.3.0.jar"
	NAME="myApplet113" HEIGHT=0 WIDTH=0
	codebase="/zimbra/public/ecoit_plugin50"></APPLET>
<% //SampleEncrypt encrypt = new SampleEncrypt();%>
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
		   acct = prov.get(Provisioning.AccountBy.id, authToken.getAccountId());
		}
		
		if (acct != null) {
		    name = acct.getName();
		}
		pageContext.setAttribute("submited",request.getMethod());
		pageContext.setAttribute("name",name);
		String public_key = request.getParameter("txtPublicKey");
		//public_key="sdgsdg";
		pageContext.setAttribute("public_key",public_key);
}
%>

<script>
	document.getElementById('txtPublicKey').value = document.myApplet113.getPublicKey();
	if (document.myApplet113.getPublicKey()==null){
		document.getElementById('public_key_form').style.display="none";
		document.getElementById('public_key_div').innerHTML = "Chua nhan duoc Token";
		
	}
	
</script>

<sql:setDataSource var="dataSource" driver="com.mysql.jdbc.Driver"
	url="jdbc:mysql://localhost:7306/zimbra" user="zimbra"
	password="FW2n76RRxFmPPBczb5SuSPv8FiQNhDu"/>
<sql:update dataSource="${dataSource}" var="result">
      UPDATE mailbox SET public_key='${public_key }' where comment='${name}';
</sql:update>
<c:if test="${submited == 'POST'}">
	<script>
		window.close();
	</script>
</c:if>

</html>
