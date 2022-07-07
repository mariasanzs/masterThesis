import { LocalCryptUtils } from 'crypt-util'
import { VerifiablePresentationSigner, VerifiablePresentationGenerator } from 'vp-toolkit'
import { VerifiableCredential } from 'vp-toolkit-models'
import { signer, patientVC } from './patientCertificate'
import { IDpatientVC } from'./IDCertificate'
const fs = require('fs');
const path = require('path');
console.log('\x1b[4m')
const yourPrivateKey = 'xprv9s21ZrQH143K4Hahxy3chUqrrHbCynU5CcnRg9xijCvCG4f3AJb1PgiaXpjik6pDnT1qRmf3V3rzn26UNMWDjfEpUKL4ouy6t5ZVa4GAJVG' // Todo: Load your private key here
const cryptAlgorithm = new LocalCryptUtils() // secp256k1 algorithm
const vpsigner = new VerifiablePresentationSigner(cryptAlgorithm, signer)
const generator = new VerifiablePresentationGenerator(vpsigner)

const existingVerifiableCredentials: VerifiableCredential[] = [patientVC, IDpatientVC] 
// Creating a VerifiablePresentation object:
console.log('\x1b[36m%s\x1b[0m','-----------------------------------------------------------');
console.log("Generating Patient Verifiable Presentation ...")
const keys = [{ accountId: 0, keyId:41 }]
cryptAlgorithm.importMasterPrivateKey(yourPrivateKey)
const IDpatientVP = generator.generateVerifiablePresentation({
  '@context': ["https://www.w3.org/2018/credentials/v1",
  "http://schema.org"],
  id: 'urn:uuid:0xE1f6a9A0F05373EC4Ca76FD5F6dd8D0308Ba9de4',
  type: ['VerifiablePresentation','PatientPresentation'],
  verifiableCredential: existingVerifiableCredentials
}, keys)

// The generator attaches one proof object for each verifiableCredential, so the credential ownership becomes cryptographically verifiable.
//console.log(JSON.stringify(IDpatientVP, null, 2))

//console.log(vpsigner.verifyVerifiablePresentation(IDpatientVP)) // true or false

// Validating a VerifiablePresentation  object:
console.log('\x1b[36m%s\x1b[0m','Validating Verifiable Presentation for patient ...');
if(vpsigner.verifyVerifiablePresentation(IDpatientVP)){
  console.log("✅ VC's ownership is correct")
  fs.writeFileSync(path.resolve(__dirname, "../wallet/patient/patientVP.json"), JSON.stringify(IDpatientVP, null, 2))
  console.log('\x1b[35m%s\x1b[0m','VP SAVED!');
}else{
  console.log("❌ There is a problem with VC's ownership")
}