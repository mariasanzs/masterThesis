"use strict";
/*
 * Copyright 2020 Coöperatieve Rabobank U.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const HDKey = require("hdkey");
const brorand = require("brorand");
const secp256k1 = require("secp256k1");
const js_sha3_1 = require("js-sha3");
class LocalCryptUtils {
    /**
     * Shows what kind of cryptographic algorithm is
     * using this instance.
     * @return string
     */
    get algorithmName() {
        return 'secp256k1';
    }
    /**
     * Creates the master private key, which can be exported for local storage
     */
    createMasterPrivateKey() {
        this._hdkey = HDKey.fromMasterSeed(brorand(32));
        if (!this._hdkey) {
            throw new Error('Could not create master private key');
        }
    }
    /**
     * Exports the master private key
     * @return string the private key
     */
    exportMasterPrivateKey() {
        return this._hdkey.privateExtendedKey;
    }
    /**
     * Imports a master private extended key
     * @param privExtKey the key to be imported
     */
    importMasterPrivateKey(privExtKey) {
        this._hdkey = HDKey.fromExtendedKey(privExtKey);
    }
    /**
     * Derives the corresponding private key for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived private key
     */
    derivePrivateKey(account, keyId) {
        return this._hdkey.derive(this.getPath(account, keyId)).privateKey.toString('hex');
    }
    /**
     * Derives the corresponding public key for his specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived public key (prefixed with 0x)
     */
    derivePublicKey(account, keyId) {
        // hdkey only returns public key in compressed format. secp256k1 allows for uncompressed format, which we need.
        // The first byte must be stripped off
        const pubKey = secp256k1.publicKeyCreate(this._hdkey.derive(this.getPath(account, keyId)).privateKey, false).slice(-64);
        return pubKey.toString('hex');
    }
    /**
     * Derives the corresponding address for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived address key, prefixed with 0x
     */
    deriveAddress(account, keyId) {
        // hdkey only returns public key in compressed format. secp256k1 allows for uncompressed format, which we need.
        // The first byte must be stripped off
        const pubKey = secp256k1.publicKeyCreate(this._hdkey.derive(this.getPath(account, keyId)).privateKey, false).slice(-64);
        return this.toChecksumAddress(js_sha3_1.keccak256(pubKey).slice(-40));
    }
    /**
     * Computes an address out of an uncompressed public key
     * @param publicKey the full, uncompressed public key
     * @return string the new derived address key, prefixed with 0x
     */
    getAddressFromPubKey(publicKey) {
        return this.toChecksumAddress(js_sha3_1.keccak256(Buffer.from(publicKey, 'hex')).slice(-40));
    }
    /**
     * Derives the corresponding public extended key for his specific account(id) and key(id) using accountid and keyid
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived public extended key
     */
    derivePublicExtendedKey(account, keyId) {
        return this._hdkey.derive(this.getPath(account, keyId)).publicExtendedKey;
    }
    /**
     * Derives the corresponding public extended key for his specific path
     * @param path the literal hdkey path
     * @return string the new derived public extended key
     */
    derivePublicExtendedKeyFromPath(path) {
        return this._hdkey.derive(path).publicExtendedKey;
    }
    /**
     * Derives the corresponding private extended key for his specific path
     * @param path the literal hdkey path
     * @return string the new derived private extended key
     */
    derivePrivateKeyFromPath(path) {
        return this._hdkey.derive(path).privateKey.toString('hex');
    }
    /**
     * Signs a certain payload with the corresponding key for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @param payload the payload which will be signed
     * @return string the signature
     */
    signPayload(account, keyId, payload) {
        const childHdkey = this._hdkey.derive(this.getPath(account, keyId));
        const hashBuf = Buffer.from(js_sha3_1.keccak256.digest(payload));
        return childHdkey.sign(hashBuf).toString('hex');
    }
    /**
     * Verifies that the signature over a payload is set by the owner of the publicKey
     * @param payload the payload which will be signed
     * @param publicKey the public key from the signer
     * @param signature the signature from the signer
     * @return boolean whether the payload is valid or not
     */
    verifyPayload(payload, publicKey, signature) {
        const hash = Buffer.from(js_sha3_1.keccak256.digest(payload));
        const signatureBuf = Buffer.from(signature, 'hex');
        const buf = Buffer.from(('04' + publicKey.replace(/^0x/, '')), 'hex');
        return secp256k1.verify(hash, signatureBuf, buf);
    }
    /**
     * Determine the correct getPath for Ethereum like key
     * for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new path
     */
    getPath(account, keyId) {
        return `m/44'/60'/${account}'/0'/${keyId}'`;
    }
    /**
     * Determine the checksum address variant
     * @param address the address to be converted to a checksumaddress
     * @return a checksummed address
     */
    toChecksumAddress(address) {
        const hash = js_sha3_1.keccak256(address);
        let ret = '0x';
        for (let i = 0; i < address.length; i++) {
            if (parseInt(hash[i], 16) >= 8) {
                ret += address[i].toUpperCase();
            }
            else {
                ret += address[i];
            }
        }
        return ret;
    }
}
exports.LocalCryptUtils = LocalCryptUtils;
//# sourceMappingURL=local-crypt-utils.js.map