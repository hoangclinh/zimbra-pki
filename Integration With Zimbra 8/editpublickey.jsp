<head><meta charset="utf-8">
<link rel="stylesheet" href="/zimbra/public/ecoit_css/style.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
</head>
<APPLET CODE="com.ecoit.ca.applet.SampleApplet.class"  
		archive="sCAApplet.jar,lib/bcprov-jdk.jar,lib/itext-xtra-5.1.3.jar,lib/poi-excelant-3.9-20121203.jar,lib/commons-codec-1.5.jar,lib/jacob-1.14.3.jar,lib/poi-ooxml-3.9-20121203.jar,lib/commons-logging-1.1.jar,lib/jaxen-1.1.jar,lib/poi-ooxml-schemas-3.9-20121203.jar,lib/commons-net-3.2.jar,lib/log4j-1.2.13.jar,lib/poi-scratchpad-3.9-20121203.jar,lib/dom4j-1.6.1.jar,lib/openxml4j-sig.jar,lib/stax-api-1.0.1.jar,lib/itext-2.1.7.jar,lib/poi-3.9-20121203.jar,lib/xmlbeans-2.3.0.jar"
        NAME="applet" 
        HEIGHT=0 WIDTH=0
        codebase="/zimbra/public/ecoit_plugin55">
</APPLET>
<%@ page buffer="8kb" autoFlush="true" %>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ page session="false" %>
<%@ taglib prefix="zm" uri="com.zimbra.zm" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="com.zimbra.i18n" %>
<%@ taglib prefix="app" uri="com.zimbra.htmlclient" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page import="com.zimbra.cs.account.Provisioning"%>
<%@ page import="com.zimbra.cs.account.Provisioning.AccountBy"%>
<%@ page import="com.zimbra.cs.account.Account"%>
<%@ page import="com.zimbra.cs.account.AuthToken"%>
<div class="certificate"></div>
<div class="body-certificate">
	<div class="name" style="width: 400px;">Đặng Bảo Chung</div>
</div>

<%
int check = 1;
String uComment=null;
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
  	uComment = acct.getName();
  	pageContext.setAttribute("uComment",uComment);
}catch (Exception ex){
	check=0;
}
%>

<sql:setDataSource var="dataSource" driver="com.mysql.jdbc.Driver"
				url="jdbc:mysql://localhost:7306/zimbra" user="zimbra"
				password="R_AoPF52Hv.ejQ.3vc43sdbAoV" />

<input type="hidden" id="publickey" value="">
<%
if (check==1){
%>
<sql:query dataSource="${dataSource}" var="result">
	SELECT * FROM mailbox;
</sql:query>

<% 
} else if (uComment!=null){
%>
<sql:query dataSource="${dataSource}" var="result">
	SELECT * FROM mailbox where comment='${uComment}';
</sql:query>
<% 
} 
%>
<ul>
<c:forEach var="row" items="${result.rows}">
	<li class="parent">
		<ul class="item">
			<li class="item mail"><c:out value="${row.comment}"/></li>
			<li class="item itemc <c:if test="${row.public_key !=''}">checked</c:if>"><div></div></li>
			<li class="item"><a href="#" title="Nạp Public key"><div class="import" id="${row.id}"></div></a></li>
			<li class="item"><a href="#" title="Xóa public key"><div class="delete" id="${row.id}"></div></a></li>
			<li class="clear"></li>
		</ul>
	</li>
</c:forEach>
</ul>

</html>
<script>
$(document).ready(function(){
	if (document.applet.checkTokenAvailable()=="true"){
		alert("sgsfg");
		jQuery("#publickey").val(document.applet.getPublicKey());
		jQuery("div.body-certificate .name").html(document.applet.getName());
		jQuery("div.body-certificate").css("display","block");
		jQuery("div.certificate").css("display","block");
	}
	//alert(document.applet.getName());
	jQuery("li.item a .import").click(
		function(){
			var publickey = jQuery("#publickey").val();
			if (publickey==""){
				alert("Chưa nhận được ETocken. Hãy kiểm tra và thử lại");
				return;
			}
			jQuery.ajax(
				{
					url: "/zimbra/public/ajax/addPublicKey.jsp",
					data:{uid:$(this).attr("id"), publickey:publickey},
					success:function(){
						alert("Nạp thành công");
						location.reload();
					}
				}
			);
		}
	);
	
	jQuery("li.item a .delete").click(
			function(){
				var conf = confirm("Bạn có chắc chắn muốn xóa không?");
				if (!conf) return;
				jQuery.ajax(
					{
						url: "/zimbra/public/ajax/addPublicKey.jsp",
						data:{uid:$(this).attr("id"), publickey:""},
						success:function(){
							alert("Public Key đã được xóa");
							location.reload();
						}
					}
				);
			}
		);
	
});
	
</script>