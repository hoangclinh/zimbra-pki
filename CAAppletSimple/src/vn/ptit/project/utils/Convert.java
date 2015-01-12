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

import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;

/**
 *
 * @author Administrator
 */
public class Convert {

    public static byte[] unicodeDecode(String data) {
        ByteBuffer bb = Charset.forName("UTF-8").encode(data);
        return bb.array();
    }

    public static String unicodeEncode(byte[] byteData) {
        String originalData = "";
        ByteBuffer bb = ByteBuffer.wrap(byteData);
        CharBuffer cb = Charset.forName("UTF-8").decode(bb);
        char[] ch = cb.array();
        for (int i = 0; i < ch.length; i++) {
            if (ch[i] != '\0') {
                originalData = originalData + ch[i];
            }
        }
        return originalData;
    }
}
