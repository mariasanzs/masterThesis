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

export interface CryptUtil {

  /**
   * Shows what kind of cryptographic algorithm is
   * using this instance.
   * @return string
   */
  algorithmName: string

  /**
   * Creates the master private key, which can be exported for local storage
   */
  createMasterPrivateKey (): void

  /**
   * Exports the master private key
   * @return string the private key
   */
  exportMasterPrivateKey (): string

  /**
   * Imports a master private extended key
   * @param privExtKey the key to be imported
   */
  importMasterPrivateKey (privExtKey: string): void

  /**
   * Derives the corresponding private key for this specific account(id) and key(id)
   * @param account the account ID
   * @param keyId the key ID
   * @return string the new derived private key
   */
  derivePrivateKey (account: number, keyId: number): string

  /**
   * Derives the corresponding public key for his specific account(id) and key(id)
   * @param account the account ID
   * @param keyId the key ID
   * @return string the new derived public key (prefixed with 0x)
   */
  derivePublicKey (account: number, keyId: number): string

  /**
   * Derives the corresponding public extended key for his specific account(id) and key(id)
   * @param account the account ID
   * @param keyId the key ID
   * @return string the new derived public extended key
   */
  derivePublicExtendedKey (account: number, keyId: number): string

  /**
   * Derives the corresponding public extended key for his specific path
   * @param path the literal hdkey path
   * @return string the new derived public extended key
   */
  derivePublicExtendedKeyFromPath (path: string): string

  /**
   * Derives the corresponding private extended key for his specific path
   * @param path the literal hdkey path
   * @return string the new derived private extended key
   */
  derivePrivateKeyFromPath (path: string): string

  /**
   * Derives the corresponding address for this specific account(id) and key(id)
   * @param account the account ID
   * @param keyId the key ID
   * @return string the new derived address key, prefixed with 0x
   */
  deriveAddress (account: number, keyId: number): string

  /**
   * Computes an address out of an uncompressed public key
   * @param publicKey the full, uncompressed public key
   * @return string the new derived address key, prefixed with 0x
   */
  getAddressFromPubKey (publicKey: string): string

  /**
   * Signs a certain payload with the corresponding key for this specific account(id) and key(id)
   * @param account the account ID
   * @param keyId the key ID
   * @param payload the payload which will be signed
   * @return string the signature
   */
  signPayload (account: number, keyId: number, payload: string): string

  /**
   * Verifies that the signature over a payload is set by the owner of the publicKey
   * @param payload the payload which will be signed
   * @param publicKey the public key from the signer
   * @param signature the signature from the signer
   * @return boolean whether the payload is valid or not
   */
  verifyPayload (payload: string, publicKey: string, signature: string): boolean
}
