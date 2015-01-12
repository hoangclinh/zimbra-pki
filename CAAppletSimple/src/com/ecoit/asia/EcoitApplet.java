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
import java.io.InputStream;
import java.security.PrivateKey;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
import vn.ptit.project.encrypt.FormEncrypt;
import vn.ptit.project.exception.SignatureException;
import vn.ptit.project.signature.FormSigner;
import vn.ptit.project.token.TokenModule;
import vn.ptit.project.token.TokenModules;

public class EcoitApplet extends Applet {

	private static final long serialVersionUID = 1L;
	/**
	 * 
	 * @param original
	 * @return base64 format of signature
	 */
	public String signForm(String original) throws SignatureException{
		return FormSigner.signForm(original);
	}
	/**
	 * 
	 * @param original
	 * @param signature : base64 format
	 * @param base64Cetificate
	 * @return
	 * @throws Exception
	 */
	public boolean verifyForm(String original,String signature,String base64Cetificate) throws Exception{
		byte b[] = new BASE64Decoder().decodeBuffer(base64Cetificate);
        InputStream _in = new ByteArrayInputStream(b);
		CertificateFactory certFactory = CertificateFactory.getInstance("X.509");
        X509Certificate cert = (X509Certificate)certFactory.generateCertificate(_in);
		return FormSigner.verifyForm(signature, original, cert.getPublicKey());
	}
	/**
	 * 
	 * @return certificate in usb-token
	 */ 
	public String getCertificate() throws Exception{
		TokenModule token = TokenModules.newDefaultTokenModule();
		X509Certificate cer = (X509Certificate) token.getEncryptCertificate();
		return new BASE64Encoder().encode(cer.getEncoded());
	}
	
	/**
	 * 
	 * @param original
	 * @param base64Certificate
	 * @return dataEncrypt
	 * @throws Exception
	 */
	public String encryptData(String original,String base64Certificate) throws Exception{
		TokenModule token = TokenModules.newDefaultTokenModule();
		X509Certificate cer = (X509Certificate) token.getEncryptCertificate();
		return FormEncrypt.encrypt(original, cer.getPublicKey());
	}
	
	/**
	 * 
	 * @param encryptData
	 * @return data original
	 * @throws Exception
	 */
	public String decryptData(String encryptData) throws Exception{
		TokenModule token = TokenModules.newDefaultTokenModule();
		return FormEncrypt.decrypt(encryptData, token.getEncryptPrivateKey());
	}
	
	/**
	 *  Generate challenge with 100 character
	 * @param challenge string in base64 format
	 * @return response String 
	 * @throws Exception
	 */
	public String response(String challenge) throws Exception{
		TokenModule token = TokenModules.newDefaultTokenModule();
		return FormEncrypt.authenticate(challenge, token.getEncryptPrivateKey());
	}
}

