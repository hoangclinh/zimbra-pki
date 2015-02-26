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
package vn.ptit.project.encrypt;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.KeySpec;
import java.util.Random;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;

import org.apache.commons.codec.binary.Hex;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
import vn.ptit.project.utils.Convert;

/**
 *
 * @author Administrator
 */
public class FormEncrypt {

    public static String generateRandomString(int length) {
        String tmp = "";
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int type = (int) (random.nextFloat() * 3.0F);
            switch (type) {
                case 0:
                    tmp = tmp + (char) (48 + (int) (random.nextFloat() * 9.0F));
                    break;
                case 1:
                    tmp = tmp + (char) (97 + (int) (random.nextFloat() * 26.0F));
                    break;
                case 2:
                    tmp = tmp + (char) (65 + (int) (random.nextFloat() * 26.0F));
            }
        }
        return tmp;
    }

//    public static String encryptKey(String originalKey, PublicKey pubKey) {
//        try {
//            Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
//            cipher.init(Cipher.ENCRYPT_MODE, pubKey);
//            byte[] cipherData = cipher.doFinal(originalKey.getBytes());
//            return new BASE64Encoder().encode(cipherData);
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return null;
//    }
//
//    public static String decryptKey(String encryptKey, PrivateKey key) {
//        try {
//            Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
//            cipher.init(Cipher.DECRYPT_MODE, key);
//            byte[] cipherData = new BASE64Decoder().decodeBuffer(encryptKey);
//            byte[] plainData = cipher.doFinal(cipherData);
//            return new String(plainData);
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return null;
//    }
//
//    public static String encryptData(String data, String _key) {
//        try {
//            SecretKeyFactory skf = SecretKeyFactory.getInstance("DESede");
//            DESedeKeySpec ks = new DESedeKeySpec(_key.getBytes());
//            SecretKey key = skf.generateSecret(ks);
//
//            Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
//            cipher.init(Cipher.ENCRYPT_MODE, key);
//            byte[] plainText = data.getBytes("UTF-8");
//            return new BASE64Encoder().encode(plainText);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
//
//    public static String decryptData(String encryptData, String _key) {
//        try {
//            Cipher cipher = Cipher.getInstance("DESede/CBC/PKCS5Padding");
//            KeySpec ks = new DESedeKeySpec(_key.getBytes());
//            SecretKeyFactory skf = SecretKeyFactory.getInstance("DESede");
//            SecretKey key = skf.generateSecret(ks);
//            cipher.init(Cipher.ENCRYPT_MODE, key);
//            byte[] plainText = new BASE64Decoder().decodeBuffer(encryptData);
//            return new String(plainText, "UTF-8");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }

    
    public static String authenticate(String request, PrivateKey priKey) {
        try {
            Cipher cipher = Cipher.getInstance("RSA/ECB/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, priKey);
            byte[] b = Hex.decodeHex(request.toCharArray());
            byte[] cipherText = cipher.doFinal(b);
            String data = new String(cipherText);
            return data;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    public static String encrypt(String plaintext, PublicKey pub) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, pub);
        byte[] bytes = plaintext.getBytes("UTF-8");

        byte[] encrypted = blockCipher(bytes, cipher,Cipher.ENCRYPT_MODE);

        return new BASE64Encoder().encode(encrypted);
    }

    public static String decrypt(String encrypted,PrivateKey privKey) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privKey);
        byte[] bts = new BASE64Decoder().decodeBuffer(encrypted);

        byte[] decrypted = blockCipher(bts, cipher,Cipher.DECRYPT_MODE);

        return new String(decrypted, "UTF-8");
    }

    private static byte[] blockCipher(byte[] bytes, Cipher cipher,int mode) throws IllegalBlockSizeException, BadPaddingException {
        // string initialize 2 buffers.
        // scrambled will hold intermediate results
        byte[] scrambled = new byte[0];

        // toReturn will hold the total result
        byte[] toReturn = new byte[0];
        // if we encrypt we use 100 byte long blocks. Decryption requires 128 byte long blocks (because of RSA)
        int length = (mode == Cipher.ENCRYPT_MODE) ? 200 : 256;

        // another buffer. this one will hold the bytes that have to be modified in this step
        byte[] buffer = new byte[length];

        for (int i = 0; i < bytes.length; i++) {

            // if we filled our buffer array we have our block ready for de- or encryption
            if ((i > 0) && (i % length == 0)) {
                //execute the operation
                scrambled = cipher.doFinal(buffer);
                // add the result to our total result.
                toReturn = append(toReturn, scrambled);
                // here we calculate the length of the next buffer required
                int newlength = length;

                // if newlength would be longer than remaining bytes in the bytes array we shorten it.
                if (i + length > bytes.length) {
                    newlength = bytes.length - i;
                }
                // clean the buffer array
                buffer = new byte[newlength];
            }
            // copy byte into our buffer.
            buffer[i % length] = bytes[i];
        }

        // this step is needed if we had a trailing buffer. should only happen when encrypting.
        // example: we encrypt 110 bytes. 100 bytes per run means we "forgot" the last 10 bytes. they are in the buffer array
        scrambled = cipher.doFinal(buffer);

        // final step before we can return the modified data.
        toReturn = append(toReturn, scrambled);

        return toReturn;
    }

    private static byte[] append(byte[] prefix, byte[] suffix) {
        byte[] toReturn = new byte[prefix.length + suffix.length];
        for (int i = 0; i < prefix.length; i++) {
            toReturn[i] = prefix[i];
        }
        for (int i = 0; i < suffix.length; i++) {
            toReturn[i + prefix.length] = suffix[i];
        }
        return toReturn;
    }
}
