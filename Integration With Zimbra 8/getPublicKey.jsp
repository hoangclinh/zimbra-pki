<%@ page import="com.zimbra.cs.account.*, com.zimbra.cs.zimlet.*"%>
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
		    name = acct.getId();
		}
		out.println(name);
}
%>