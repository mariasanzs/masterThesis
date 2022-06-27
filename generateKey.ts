import { LocalCryptUtils, CryptUtil } from 'crypt-util'
 
const cryptUtils: CryptUtil = new LocalCryptUtils()
 
// Create a new master key
cryptUtils.createMasterPrivateKey()
 
// Export master key: Exporting the master key should only be used if the key must be stored locally,
// crypt-util does not store private keys on the device
const masterPrivExtKey = cryptUtils.exportMasterPrivateKey()
console.log(masterPrivExtKey)
 
// Import master key (if to be restored from a local storage)
cryptUtils.importMasterPrivateKey(masterPrivExtKey)

const accountId = 0
const keyId = 41 // Some random keyId
 
// Derive private key: Should only be used if an external package requires direct usage of the key
const privKey = cryptUtils.derivePrivateKey(accountId, keyId)
console.log(privKey)
 
// Derive public key
const pubKey = cryptUtils.derivePublicKey(accountId, keyId)
console.log(pubKey)
 
// Derive address: In this case a keccak256 hash conform Ethereum standards
const address = cryptUtils.deriveAddress(accountId, keyId)
console.log(address)
