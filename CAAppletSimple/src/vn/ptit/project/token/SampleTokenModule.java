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

import java.io.ByteArrayInputStream;
import java.security.GeneralSecurityException;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.Provider;
import java.security.Security;
import java.security.cert.Certificate;
import java.util.Enumeration;

import sun.security.pkcs11.SunPKCS11;
import sun.security.pkcs11.wrapper.PKCS11;
import vn.ptit.project.exception.TokenException;
import vn.ptit.project.token.PinInputter;

public class SampleTokenModule implements TokenModule {

    private Provider provider;
    private KeyStore.Builder builder;
    private PKCS11 pkcs11;
    public static int lock = 2;

    public SampleTokenModule(String driverPath) throws TokenException {
        Provider sunPKCS11 = Security.getProvider("Token");
        if (sunPKCS11 == null) {
            sunPKCS11 = addSecurityProvider(driverPath);
        }
        if (sunPKCS11 == null) {
            throw new TokenException("Token not available");
        }
        provider = sunPKCS11;
        builder = KeyStore.Builder.newInstance(
                "PKCS11", null, new KeyStore.CallbackHandlerProtection(PinInputter.getCallbackHandler()));
    }

    
    
    @Override
    public Certificate getCertificate() throws TokenException {
        try {
            KeyStore keyStore = builder.getKeyStore();

            Enumeration<String> aliasEnum = keyStore.aliases();
            Certificate certificate = null;

            while (aliasEnum.hasMoreElements()) {
                String alias = aliasEnum.nextElement();

                certificate = ((KeyStore.PrivateKeyEntry) keyStore.getEntry(
                        alias, builder.getProtectionParameter(alias)))
                        .getCertificate();
            }

            return certificate;
        } catch (GeneralSecurityException e) {
            throw new TokenException(e);
        }
    }

    @Override
    public PrivateKey getPrivateKey() throws TokenException {
        try {
            KeyStore keyStore = builder.getKeyStore();
            Enumeration<String> aliasEnum = keyStore.aliases();
            PrivateKey key = null;
            while (aliasEnum.hasMoreElements()) {
                String alias = aliasEnum.nextElement();
                key = ((KeyStore.PrivateKeyEntry) keyStore.getEntry(alias,
                        builder.getProtectionParameter(alias))).getPrivateKey();
            }

            return key;
        } catch (GeneralSecurityException e) {
            throw new TokenException(e);
        }
    }

    @Override
    public boolean checkTokenAvailable() {
        return !provider.isEmpty();
    }

    private Provider addSecurityProvider(String driverPath) {
        PKCS11 pkcs11 = null;
        try {
            pkcs11 = PKCS11.getInstance(driverPath, "C_GetFunctionList", null,false);
            long[] slotList = pkcs11.C_GetSlotList(true);
            if (slotList.length == 0)  return null;
            String providerString = "name=Token\nlibrary=" + driverPath
                    + "\nslot=" + slotList[0];
            SunPKCS11 sunPKCS11 = new SunPKCS11(new ByteArrayInputStream(providerString.getBytes()));
            Security.addProvider(sunPKCS11);
            this.pkcs11 = pkcs11;
            return sunPKCS11;
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        } 
    }

    public void closeToken() {

        Security.removeProvider(provider.getName());
        try {
            pkcs11.finalize();
        } catch (Throwable e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @Override
    public Certificate getEncryptCertificate() throws Exception {
        try {
            KeyStore keyStore = builder.getKeyStore();

            Enumeration<String> aliasEnum = keyStore.aliases();
            Certificate certificate = null;

            while (aliasEnum.hasMoreElements()) {
                String alias = aliasEnum.nextElement();

                certificate = ((KeyStore.PrivateKeyEntry) keyStore.getEntry(
                        alias, builder.getProtectionParameter(alias)))
                        .getCertificate();
                break;
            }

            return certificate;
        } catch (GeneralSecurityException e) {
            throw new TokenException(e);
        }
    }

    @Override
    public PrivateKey getEncryptPrivateKey() throws TokenException {
        try {
            KeyStore keyStore = builder.getKeyStore();
            Enumeration<String> aliasEnum = keyStore.aliases();
            PrivateKey key = null;
            while (aliasEnum.hasMoreElements()) {
                String alias = aliasEnum.nextElement();
                key = ((KeyStore.PrivateKeyEntry) keyStore.getEntry(alias,
                        builder.getProtectionParameter(alias))).getPrivateKey();
                break;
            }

            return key;
        } catch (GeneralSecurityException e) {
            throw new TokenException(e);
        }
    }

}
