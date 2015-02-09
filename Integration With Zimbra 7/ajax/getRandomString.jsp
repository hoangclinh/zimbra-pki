
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
		 //"19076175546850990476661854967983930335101632039611282870292515813182825151904826586815264031544410155038383581204835951367774502743585948257275106545276753076072137852477170868932465299894148737240298767267236349907895015737164995836137788787133492309093226056134978443895037516154960350635852376598697295077361973887348266974517696178002060713351677496187083005441958243086655827410667654367099390133272652699985106374322180903686192218906209155448976430523269824671545227864694692080816252515890927084720582044372100867646119511325077677205907553260948429559747591120222481739981700559771149018049556956417296024941"
		 pubKey = pubKey.substring(pubKey.indexOf("modulus")+9, pubKey.indexOf("  public exponent:")-1);
		 BigInteger modulus = new BigInteger(pubKey);
		 BigInteger pubExp = new BigInteger("65537");

		 KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		 RSAPublicKeySpec pubKeySpec = new RSAPublicKeySpec(modulus, pubExp);
		 RSAPublicKey key = (RSAPublicKey) keyFactory.generatePublic(pubKeySpec);

		 Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
		 cipher.init(Cipher.ENCRYPT_MODE, key);
		 byte[] cipherData = cipher.doFinal(Base64.decodeBase64(text));
		 return Hex.encodeHexString(cipherData);
       }
       catch (Exception e) {
           System.out.println(e);
       }
	 return "";
 }
%>
<%
session= request.getSession();
String randomString = generateRandomString(32);
String public_key = request.getParameter("public_key");
session.setAttribute( "random_string", randomString);
out.print(encrypt(randomString,public_key));
%>