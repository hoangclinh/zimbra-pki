package vn.ptit.project.utils;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.util.Date;

import javax.swing.JOptionPane;

import org.bouncycastle.asn1.ASN1InputStream;
import org.bouncycastle.asn1.tsp.TimeStampResp;
import org.bouncycastle.tsp.TSPAlgorithms;
import org.bouncycastle.tsp.TimeStampRequest;
import org.bouncycastle.tsp.TimeStampRequestGenerator;
import org.bouncycastle.tsp.TimeStampResponse;
import org.bouncycastle.tsp.TimeStampToken;

public class DateFromServer {
	public static boolean TIME_STAMP = false;
	public static Date getDate() {
		try {
			String strURL = "http://ca.gov.vn/tsa";
			TimeStampToken ts = null;
			MessageDigest md = null;
			md = MessageDigest.getInstance("SHA-1");
			md.update("ABC".getBytes());
			byte[] digest = md.digest();
			OutputStream out;
			TimeStampRequestGenerator regen = new TimeStampRequestGenerator();
			regen.setCertReq(true);
			TimeStampRequest req = regen.generate(TSPAlgorithms.SHA1, digest);
			byte request[] = req.getEncoded();
			URL url = new URL(strURL);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setDoOutput(true);
			con.setDoInput(true);
			con.setRequestMethod("POST");

			con.setRequestProperty("Content-type",
					"application/timestamp-query");

			con.setRequestProperty("Content-length",
					String.valueOf(request.length));

			out = con.getOutputStream();
			out.write(request);
			out.flush();
			int j = con.getResponseCode();
			if (j != HttpURLConnection.HTTP_OK) {
				JOptionPane.showMessageDialog(null, "ERROR!");
				throw new Exception("Received HTTP errof:"
						+ con.getResponseCode() + "-"
						+ con.getResponseMessage());
			}
			InputStream in = con.getInputStream();
			TimeStampResp resp = TimeStampResp.getInstance(new ASN1InputStream(
					in).readObject());
			TimeStampResponse response = new TimeStampResponse(resp);
			response.validate(req);
			ts = response.getTimeStampToken();
			System.out.println(ts.getTimeStampInfo().getTsa());
			return ts.getTimeStampInfo().getGenTime();
		} catch (Exception e) {
			e.printStackTrace();
			return new Date();
		}

	}
}
