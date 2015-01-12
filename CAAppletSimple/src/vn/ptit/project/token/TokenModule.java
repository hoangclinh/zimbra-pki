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
package vn.ptit.project.token;

import java.security.PrivateKey;
import java.security.cert.Certificate;

import vn.ptit.project.exception.TokenException;


public interface TokenModule {

	public Certificate getCertificate() throws TokenException;

	public PrivateKey getPrivateKey() throws TokenException;
        
        public Certificate getEncryptCertificate() throws Exception;
                
        public PrivateKey getEncryptPrivateKey() throws TokenException;
	
	public boolean checkTokenAvailable();
	
	public void closeToken();

}