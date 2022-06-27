import { CryptUtil } from './interface/crypt-util';
export declare class LocalCryptUtils implements CryptUtil {
    private _hdkey;
    /**
     * Shows what kind of cryptographic algorithm is
     * using this instance.
     * @return string
     */
    readonly algorithmName: string;
    /**
     * Creates the master private key, which can be exported for local storage
     */
    createMasterPrivateKey(): void;
    /**
     * Exports the master private key
     * @return string the private key
     */
    exportMasterPrivateKey(): string;
    /**
     * Imports a master private extended key
     * @param privExtKey the key to be imported
     */
    importMasterPrivateKey(privExtKey: string): void;
    /**
     * Derives the corresponding private key for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived private key
     */
    derivePrivateKey(account: number, keyId: number): string;
    /**
     * Derives the corresponding public key for his specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived public key (prefixed with 0x)
     */
    derivePublicKey(account: number, keyId: number): string;
    /**
     * Derives the corresponding address for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived address key, prefixed with 0x
     */
    deriveAddress(account: number, keyId: number): string;
    /**
     * Computes an address out of an uncompressed public key
     * @param publicKey the full, uncompressed public key
     * @return string the new derived address key, prefixed with 0x
     */
    getAddressFromPubKey(publicKey: string): string;
    /**
     * Derives the corresponding public extended key for his specific account(id) and key(id) using accountid and keyid
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new derived public extended key
     */
    derivePublicExtendedKey(account: number, keyId: number): string;
    /**
     * Derives the corresponding public extended key for his specific path
     * @param path the literal hdkey path
     * @return string the new derived public extended key
     */
    derivePublicExtendedKeyFromPath(path: string): string;
    /**
     * Derives the corresponding private extended key for his specific path
     * @param path the literal hdkey path
     * @return string the new derived private extended key
     */
    derivePrivateKeyFromPath(path: string): string;
    /**
     * Signs a certain payload with the corresponding key for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @param payload the payload which will be signed
     * @return string the signature
     */
    signPayload(account: number, keyId: number, payload: string): string;
    /**
     * Verifies that the signature over a payload is set by the owner of the publicKey
     * @param payload the payload which will be signed
     * @param publicKey the public key from the signer
     * @param signature the signature from the signer
     * @return boolean whether the payload is valid or not
     */
    verifyPayload(payload: string, publicKey: string, signature: string): boolean;
    /**
     * Determine the correct getPath for Ethereum like key
     * for this specific account(id) and key(id)
     * @param account the account ID
     * @param keyId the key ID
     * @return string the new path
     */
    private getPath;
    /**
     * Determine the checksum address variant
     * @param address the address to be converted to a checksumaddress
     * @return a checksummed address
     */
    private toChecksumAddress;
}
