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
package vn.ptit.project.utils;

/**
 *
 * @author Administrator
 */
public class Message {
    private String senderId;
    private String recvId;
    private String message;
    private String signature;
//    private String keyEncrypt;
    private int isSign;
    private int isEncrypt;
    

    public Message() {
    }

    public Message(String senderId, String recvId, String message, String signature, int isSign, int isEncrypt) {
        this.senderId = senderId;
        this.recvId = recvId;
        this.message = message;
        this.signature = signature;
        this.isSign = isSign;
        this.isEncrypt = isEncrypt;
//        this.keyEncrypt = keyEncrypt;
    }

//    public String getKeyEncrypt() {
//        return keyEncrypt;
//    }
//
//    public void setKeyEncrypt(String keyEncrypt) {
//        this.keyEncrypt = keyEncrypt;
//    }

    
    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getRecvId() {
        return recvId;
    }

    public void setRecvId(String recvId) {
        this.recvId = recvId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

   
    public int getIsSign() {
        return isSign;
    }

    public void setIsSign(int isSign) {
        this.isSign = isSign;
    }

    public int getIsEncrypt() {
        return isEncrypt;
    }

    public void setIsEncrypt(int isEncrypt) {
        this.isEncrypt = isEncrypt;
    }
}
