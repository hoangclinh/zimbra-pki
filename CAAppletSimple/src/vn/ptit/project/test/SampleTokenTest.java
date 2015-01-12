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

package vn.ptit.project.test;

import java.security.cert.X509Certificate;

import sun.misc.BASE64Encoder;
import vn.ptit.project.encrypt.FormEncrypt;
import vn.ptit.project.signature.FormSigner;
import vn.ptit.project.token.TokenModule;
import vn.ptit.project.token.TokenModules;

import com.ecoit.asia.EcoitApplet;

public class SampleTokenTest {

    public SampleTokenTest() {
        TokenModule token = TokenModules.newDefaultTokenModule();
        try {
        	EcoitApplet applet = new EcoitApplet();
        	String exampleString = "ExampleString";
        	// Goi function nay luc ky'
        	String signature = applet.signForm(exampleString);
        	System.out.println("Signature:"+signature);
//                System.out.println(token.getCertificate().getPublicKey().toString());
                X509Certificate cer = (X509Certificate) token.getEncryptCertificate();
                byte[] base64Bytes = cer.getEncoded();
                // Gui base64Cerificate luu tren server
                String base64Cetificate = new BASE64Encoder().encode(base64Bytes);
                // Verify chu ky
            boolean verify = applet.verifyForm(exampleString,signature,base64Cetificate);
            System.out.println("Verify "+verify);
            
            
            
            // Chuoi ma hoa cua server
                String data = "nJr6xBQ/g2D1hyrYFPW81/iWPxR9VXy6ykwHHscwLlKYbgCXgAWnyqY0BHAQETYfKbSx1z56J+sWAmvej8XArf32QG8jMdvSoHrpR+Uf/yaN8JNRMZo2VmUXsnGnEs0WesEzM1bOYSwTz+ew7LgzF1Z6HjUm7uOtbyY/0iGoSNXhwHLCyTX3SujRj+hCywRsmAxQjakguJY7aJVyNi/T7Uz6RuY2t/Whfj/xVAslwATe8onqxOPkDFqc0899hT2IGKpGiHon1HNXOZVBFXQFD9vx59B8+s0Nq3JgpO40cXbWtF+T7Sds+3lUze/oFx1cvOy97X/zF+Gvwjtyiss/dg==";
              
                System.out.println(FormEncrypt.authenticate(data, token.getEncryptPrivateKey()));
                // Giai ma duoi client
                // 2Ct5vgnYULkCRMFtsAgvgRrcnP2wqepVsgoo6FlorD5T4TZl4FSK3G5y69uJOMpKgNHz5VGGlne2DSG64DRRdo8MbkkOzcMrscnD 

                
                
                
                
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String args[]) {
        new SampleTokenTest();
    }
}
