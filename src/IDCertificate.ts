import { LocalCryptUtils } from 'crypt-util'
import { VerifiableCredentialSigner, VerifiableCredentialGenerator } from 'vp-toolkit'
import { CredentialStatus } from 'vp-toolkit-models'

const yourPrivateKey = 'xprv9s21ZrQH143K2LGT5KeWPddxBVLs42oAr6QZwGUoL7Xe5BiLyKG1B8QyyCByHH5DM96GuJpHHB4pZYLXbpMeE17Di4F37v8LspL3JnHB8LC'
const cryptAlgorithm = new LocalCryptUtils() // secp256k1 algorithm
const signer = new VerifiableCredentialSigner(cryptAlgorithm)
const generator = new VerifiableCredentialGenerator(signer)
const fs = require('fs');
const path = require('path');

// Creating a VerifiableCredential object:
cryptAlgorithm.importMasterPrivateKey(yourPrivateKey)
export const IDpatientVC = generator.generateVerifiableCredential({
  '@context': ["http://schema.org"],
  id: 'https://www.dnielectronico.es/credentials/99999999',
  type: ['VerifiableCredential', 'IDCredential'],
  issuer: 'did:protocol:0x9c6a28B1a933acF8683574655fAfF1Ce09D11B4c',
  issuanceDate: new Date(Date.UTC(2019, 0, 1, 23, 34, 56)),
  credentialSubject: {
    id: 'did:atent@:0xfE69E4457295b5554402e62A7D98b5efB8380174',
    givenName:'Patricia Perez Perez',
    gender: 'F',
    nationality:'Spain',
    birthDate:'15-02-2006',
    identifier:'99999999R',
    expires:'27-03-2023',
    address: {
        streetAddress: 'Calle Preciados 12',
        addressLocality: 'Madrid',
        addressRegion: 'Madrid'
    }
  },
  credentialStatus: new CredentialStatus({
    id: '0xE1f6a9A0F05373EC4Ca76FD5F6dd8D0308Ba9de4', // The pointer to the registry. In this case, a smart contract address.
    type: 'vcStatusRegistry2019' // The type so the correct implementation can check for DID revocations
  })
}, 0, 0)

// The generator attaches a proof object to the verifiableCredential so it becomes cryptographically verifiable.
console.log('\x1b[36m%s\x1b[0m','Generating VC for patient ID...');
//console.log(JSON.stringify(IDpatientVC, null, 2))


// Validating a VerifiableCredential object:
console.log('\x1b[36m%s\x1b[0m','Validating VC for patient ID...');
if(signer.verifyVerifiableCredential(IDpatientVC)){
  console.log("✅ VC's integrity is correct and Issuer's signing is correct")
  fs.writeFileSync(path.resolve(__dirname, "../wallet/patient/patientIDVC.json"), JSON.stringify(IDpatientVC, null, 2))
  console.log('\x1b[35m%s\x1b[0m','SAVED IN WALLET!');
}else{
  console.log("❌ There is a problem with VC's integrity and/or Issuer's signing")
}