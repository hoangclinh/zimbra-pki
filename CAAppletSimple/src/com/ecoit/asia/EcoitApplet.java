/*
 * Copyright (C) 2012-2015 EcoIT Corp
 * Author: TrongDD
 * This file is part of CA Applet
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.ecoit.asia;

import java.applet.Applet;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.AccessController;
import java.security.PrivilegedAction;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.UIManager;

import org.apache.commons.io.FileUtils;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
import vn.ptit.project.encrypt.FormEncrypt;
import vn.ptit.project.exception.SignatureException;
import vn.ptit.project.signature.FormSigner;
import vn.ptit.project.token.TokenModule;
import vn.ptit.project.token.TokenModules;

import com.ecoit.asia.pdfsigner.SigningModules;

public class EcoitApplet extends Applet {

	public EcoitApplet() {
		try {
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static final long serialVersionUID = 1L;

	/**
	 * 
	 * @param original
	 * @return base64 format of signature
	 */
	public String signForm(final String original) {
		return AccessController.doPrivileged(new PrivilegedAction<String>() {

			@Override
			public String run() {
				try {
					return FormSigner.signForm(original);
				} catch (SignatureException e) {
					e.printStackTrace();
					return null;
				}
			}
		});

	}

	/**
	 * 
	 * @param original
	 * @param signature
	 *            : base64 format
	 * @param base64Cetificate
	 * @return
	 * @throws Exception
	 */
	public boolean verifyForm(final String original,final String signature,
			final String base64Cetificate){
		return AccessController.doPrivileged(new PrivilegedAction<Boolean>() {

			/*
			 * (non-Javadoc)
			 * 
			 * @see java.security.PrivilegedAction#run()
			 */
			@Override
			public Boolean run() {
				try{
					byte b[] = new BASE64Decoder().decodeBuffer(base64Cetificate);
					InputStream _in = new ByteArrayInputStream(b);
					CertificateFactory certFactory = CertificateFactory
							.getInstance("X.509");
					X509Certificate cert = (X509Certificate) certFactory
							.generateCertificate(_in);
					return FormSigner.verifyForm(signature, original, cert.getPublicKey());
				}catch(Exception ex){
					ex.printStackTrace();
				}
				return false;
			}
		});
	}

	/**
	 * 
	 * @return certificate in usb-token
	 */
	public String getCertificate() {
		return AccessController.doPrivileged(new PrivilegedAction<String>() {

			/*
			 * (non-Javadoc)
			 * 
			 * @see java.security.PrivilegedAction#run()
			 */
			@Override
			public String run() {
				try {
					TokenModule token = TokenModules.newDefaultTokenModule();
					X509Certificate cer = (X509Certificate) token.getEncryptCertificate();
					return new BASE64Encoder().encode(cer.getEncoded());
				} catch (Exception e) {
					e.printStackTrace();
				}
				return null;
			}
		});
	}

	/**
	 * 
	 * @param original
	 * @param base64Certificate
	 * @return dataEncrypt
	 * @throws Exception
	 */
	public String encryptData(final String original,final String base64Certificate){
		return AccessController.doPrivileged(new PrivilegedAction<String>() {

			/*
			 * (non-Javadoc)
			 * 
			 * @see java.security.PrivilegedAction#run()
			 */
			@Override
			public String run() {
				try {
					TokenModule token = TokenModules.newDefaultTokenModule();
					X509Certificate cer = (X509Certificate) token.getEncryptCertificate();
					return FormEncrypt.encrypt(original, cer.getPublicKey());
				} catch (Exception e) {
					e.printStackTrace();
				}
				return null;
			}
		});
	}

	/**
	 * 
	 * @param encryptData
	 * @return data original
	 * @throws Exception
	 */
	public String decryptData(final String encryptData) {
		return AccessController.doPrivileged(new PrivilegedAction<String>() {

			/*
			 * (non-Javadoc)
			 * 
			 * @see java.security.PrivilegedAction#run()
			 */
			@Override
			public String run() {
				try {
					TokenModule token = TokenModules.newDefaultTokenModule();
					return FormEncrypt.decrypt(encryptData, token.getEncryptPrivateKey());
				} catch (Exception e) {
					e.printStackTrace();
				}
				return null;
			}
		});
	}

	/**
	 * Generate challenge with 100 character
	 * 
	 * @param challenge
	 *            string in base64 format
	 * @return response String
	 * @throws Exception
	 */
	public String response(final String challenge){
		return AccessController.doPrivileged(new PrivilegedAction<String>() {

			/*
			 * (non-Javadoc)
			 * 
			 * @see java.security.PrivilegedAction#run()
			 */
			@Override
			public String run() {
				try {
					TokenModule token = TokenModules.newDefaultTokenModule();
					return FormEncrypt
							.authenticate(challenge, token.getEncryptPrivateKey());	
				} catch (Exception e) {
					e.printStackTrace();
				}
				return null;
			}
		});
	}

	public String signPDF(final String url,final float minX,final float minY,final float maxX,final float maxY) {
		return AccessController.doPrivileged(new PrivilegedAction<String>() {

			/*
			 * (non-Javadoc)
			 * 
			 * @see java.security.PrivilegedAction#run()
			 */
			@Override
			public String run() {
				System.out
						.println("================ signPDF ==================");
				try {
					String property = "java.io.tmpdir";
					String tempDir = System.getProperty(property);
					// Select signature
					JFileChooser signatureFileChooser = new JFileChooser();
					signatureFileChooser.setDialogTitle("Chọn hình ảnh cho chữ ký");
					signatureFileChooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
					int signatureFileChooserReturnVal = signatureFileChooser.showOpenDialog(null);
					if (signatureFileChooserReturnVal == JFileChooser.APPROVE_OPTION) {
						File signatureFile = signatureFileChooser.getSelectedFile();
						File f = new File(tempDir + File.separator
								+ "originalfile.pdf");
						FileUtils.copyURLToFile(new URL(url), f);

						String pathSigned = SigningModules.signPDF(f.getPath(),signatureFile,minX,minY,maxX,maxY);
						if (pathSigned == null)
							throw new Exception();
						Path path = Paths.get(pathSigned, new String[0]);
			            byte[] data = Files.readAllBytes(path);
			            return new BASE64Encoder().encode(data);
//						JFileChooser chooser = new JFileChooser();
//						chooser.setDialogTitle("Chọn thư mục lưu tệp tin");
//						chooser.setCurrentDirectory(f);
//						chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//						chooser.setCurrentDirectory(new File(System
//								.getProperty("user.home")
//								+ File.separator
//								+ "Desktop" + File.separator));
//						chooser.setSelectedFile(new File(FilenameUtils
//								.getBaseName(url)
//								+ "."
//								+ FilenameUtils.getExtension(url)));
//						chooser.setAcceptAllFileFilterUsed(false);
//						int returnVal = chooser.showSaveDialog(null);
//						if (returnVal == JFileChooser.APPROVE_OPTION) {
//							FileUtils.copyFile(new File(pathSigned),
//									chooser.getSelectedFile());
//						}
					} else {
						JOptionPane.showMessageDialog(null, "Ký số được hủy bỏ bởi người sử dụng!");
					}
				} catch (MalformedURLException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} catch (Exception e) {
					e.printStackTrace();
				}

				System.out
						.println("================ End signPDF ==================");
				return "";
			}
		});

	}

	public static void main(String agrs[]) {
		try {
			System.out.println(new EcoitApplet().getCertificate());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
