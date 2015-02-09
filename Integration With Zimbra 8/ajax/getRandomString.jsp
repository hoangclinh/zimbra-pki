<%@ page import="java.math.BigInteger" %>
<%@ page import="java.security.KeyFactory" %>
<%@ page import="java.security.interfaces.RSAPublicKey" %>
<%@ page import="java.security.spec.RSAPublicKeySpec" %>
<%@ page import="javax.crypto.Cipher" %>
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@ page import="org.apache.commons.codec.binary.Hex" %>
<%@ page import="javax.crypto.SecretKey" %>
<%@ page import="javax.crypto.spec.SecretKeySpec" %>
<%@ page import="java.util.UUID" %>
<%@ page import="javax.servlet.http.*" %>
<%@ page import="java.util.Random" %>
<%@ page import="java.io.ByteArrayInputStream" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="sun.misc.BASE64Decoder" %>
<%@ page import="java.security.cert.CertificateFactory" %>
<%@ page import="java.security.cert.X509Certificate" %>
<%!
public String generateRandomString(int length) {
	String tmp = "";
	Random random = new Random();
	for (int i=0; i<length; i++){
		int loai = (int)(random.nextFloat()*3);
		switch (loai) {
		case 0:
			tmp += (char)('0'+(int)(random.nextFloat()*9));
			break;
		case 1:
			tmp += (char)('a'+(int)(random.nextFloat()*26));
			break;
		case 2:
			tmp += (char)('A'+(int)(random.nextFloat()*26));
			break;	
		default:
			break;
		}
	}
	return tmp;
}
public static String encrypt(String text, String pubKey) {
	 try {
		
		byte b[] = new BASE64Decoder().decodeBuffer(pubKey);
		InputStream _in = new ByteArrayInputStream(b);
		CertificateFactory certFactory = CertificateFactory.getInstance("X.509");
		X509Certificate cert = (X509Certificate) certFactory.generateCertificate(_in);
		
		Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
		cipher.init(Cipher.ENCRYPT_MODE, cert.getPublicKey());
		byte[] original = text.getBytes();
		byte[] cipherData = cipher.doFinal(original);
		return Hex.encodeHexString(cipherData);
       }
       catch (Exception e) {
           System.out.println(e.toString());
       }
	 return "";
 }
%>
<%
session= request.getSession();
String randomString = generateRandomString(256);
String public_key = request.getParameter("public_key");
session.setAttribute( "random_string", randomString);
out.print(encrypt(randomString,public_key));
%>