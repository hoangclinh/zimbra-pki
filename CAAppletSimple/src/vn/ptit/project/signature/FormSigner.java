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
package vn.ptit.project.signature;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
import vn.ptit.project.exception.SignatureException;
import vn.ptit.project.token.TokenModule;
import vn.ptit.project.token.TokenModules;
import vn.ptit.project.utils.Convert;

/**
 *
 * @author Administrator
 */
public class FormSigner {
    /**
     * 
     * @param original : UTF-8 string
     * @return Base64 signature
     * @throws SignatureException 
     */
    public static String signForm(String original) throws SignatureException{
        try{
            TokenModule token = TokenModules.newDefaultTokenModule();
            PrivateKey privateKey = token.getEncryptPrivateKey();
            Signature signature = Signature.getInstance("SHA512withRSA");
            signature.initSign(privateKey);
            byte[] b = Convert.unicodeDecode(original);// original.getBytes("UTF-8");
            signature.update(b);
            byte[] _signature = signature.sign();
            return new BASE64Encoder().encode(_signature);
        } catch(Exception ex){
            ex.printStackTrace();
            throw new SignatureException();
        }
    }
    
    public static boolean verifyForm(String signature,String original,PublicKey pub){
        try {
            Signature sign = Signature.getInstance("SHA512withRSA");
            sign.initVerify(pub);
            byte[] byteOriginal = Convert.unicodeDecode(original);// original.getBytes("UTF-8");
            sign.update(byteOriginal);
            byte[] _signature = new BASE64Decoder().decodeBuffer(signature);
            return sign.verify(_signature);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
