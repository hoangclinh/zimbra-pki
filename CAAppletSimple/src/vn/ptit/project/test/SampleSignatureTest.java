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

import vn.ptit.project.signature.FormSigner;
import vn.ptit.project.token.TokenModule;
import vn.ptit.project.token.TokenModules;
import vn.ptit.project.utils.Convert;

/**
 *
 * @author Administrator
 */
public class SampleSignatureTest {

    public SampleSignatureTest() {
        try {
            TokenModule token = TokenModules.newDefaultTokenModule();
            String data = "Thư gửi anh công +_0-02-109203192-0 !";
//            byte[] b = Convert.unicodeDecode(data);
//            for(int i=0;i<b.length;i++){
//                System.out.print(b[i]+" ");
//            }
            String signature = FormSigner.signForm(data);
            System.out.println(FormSigner.verifyForm(signature, data, token.getCertificate().getPublicKey()));
        } catch (Exception e) {
        }
    }
    
//    public static void main(String args[]){
//        new SampleSignatureTest();
//    }
}
