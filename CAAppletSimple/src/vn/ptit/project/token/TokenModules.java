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

import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import vn.ptit.project.exception.TokenException;


public class TokenModules {

	public static final String providers = "VNPT-CA\\VNPT-CA PKI Token CSP\\wdpkcs.dll;etpkcs11.dll;eTPKCS11.dll;ostc1_csp11.dll;vdctdcsp11.dll;vnpt-ca_csp11.dll;BkavCA.dll;vnpt-ca_v34.dll;viettel-ca_v2_s.x64.dll;ShuttleCsp11_3003.dll;ngp11v211.dll;st3csp11.dll;gclib.dll;fpt-ca.dll;CA2_v34.dll;CA2_csp11.dll;psapkcs.dll;viettel-ca_v2.dll";
	private static Map<String, TokenModule> cache = new HashMap<String, TokenModule>();

	public static TokenModule newDefaultTokenModule() {
		String[] providerList = providers.split(";");

		TokenModule token = null;
		for (String provider : providerList) {
			Path driver = Paths.get(System.getenv("windir"), "system32",
					provider);

			if ((Files.exists(driver, LinkOption.NOFOLLOW_LINKS))) {
				try {
					token = cache.get(driver.toString());
					if (token == null) {
						token = new SampleTokenModule(driver.toString());
					}
					if (token != null) {
						cache.put(driver.toString(), token);
						return token;
					}
				} catch (Exception e) {
					if (!(e instanceof TokenException))
						e.printStackTrace();
				}
			}

		}

		return token;
		
	}

	public static void clearCache() {
		for (TokenModule tokenModule : cache.values()) {
			tokenModule.closeToken();
		}
		cache.clear();
	}

}
