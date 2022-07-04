import { LocalCryptUtils } from 'crypt-util'
import { VerifiableCredentialSigner, VerifiableCredentialGenerator } from 'vp-toolkit'
import { CredentialStatus } from 'vp-toolkit-models'

const yourPrivateKey = 'xprv9s21ZrQH143K2LGT5KeWPddxBVLs42oAr6QZwGUoL7Xe5BiLyKG1B8QyyCByHH5DM96GuJpHHB4pZYLXbpMeE17Di4F37v8LspL3JnHB8LC'
const cryptAlgorithm = new LocalCryptUtils() // secp256k1 algorithm
export const signer = new VerifiableCredentialSigner(cryptAlgorithm)
const generator = new VerifiableCredentialGenerator(signer)

// Creating a VerifiableCredential object:
cryptAlgorithm.importMasterPrivateKey(yourPrivateKey)
export const patientVC = generator.generateVerifiableCredential({
  '@context': ["https://www.w3.org/2018/credentials/v1",
  "http://schema.org", "http://schema2.org"],
  id: 'https://www.dnielectronico.es/credentials/99999999',
  type: ['VerifiableCredential', 'IDCertificate'],
  issuer: 'did:protocol:0x9c6a28B1a933acF8683574655fAfF1Ce09D11B4c',
  issuanceDate: new Date(Date.UTC(2019, 0, 1, 23, 34, 56)),
  credentialSubject: {
    id: 'did:atent@:0030',
    givenName:'Patricia Perez Perez',
    gender: 'F',
    department:'ADHD',
    MeetingRoom:'306',
    endDate: '17-10-2022',
    LoanorCredit: 'IoTDevice',
    serialNumber: '11KLI'
  },
  credentialStatus: new CredentialStatus({
    id: '0xE1f6a9A0F05373EC4Ca76FD5F6dd8D0308Ba9de4', // The pointer to the registry. In this case, a smart contract address.
    type: 'vcStatusRegistry2019' // The type so the correct implementation can check for DID revocations
  })
}, 0, 0)

// The generator attaches a proof object to the verifiableCredential so it becomes cryptographically verifiable.
console.log('\x1b[36m%s\x1b[0m','--------------- Generating VC for patient ID---------------');
console.log(JSON.stringify(patientVC, null, 2))
const fs = require('fs');
const path = require('path');

// Validating a VerifiableCredential object:
console.log('\x1b[36m%s\x1b[0m','--------------- Validating VC for patient Credential---------------');
if(signer.verifyVerifiableCredential(patientVC)){
  console.log("✅ VC's integrity is correct and Issuer's signing is correct")
  fs.writeFileSync(path.resolve(__dirname, "../credentials/patient/patientVC.json"), JSON.stringify(patientVC, null, 2))
  fs.writeFileSync(path.resolve(__dirname, "../credentials/patient/VCsigner.json"), JSON.stringify(signer))
  console.log('\x1b[35m%s\x1b[0m','SAVED IN WALLET!');
}else{
  console.log("❌ There is a problem with VC's integrity and/or Issuer's signing")
}

