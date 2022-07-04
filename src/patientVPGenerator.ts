import { LocalCryptUtils } from 'crypt-util'
import { VerifiablePresentationSigner, VerifiablePresentationGenerator } from 'vp-toolkit'
import { VerifiableCredential } from 'vp-toolkit-models'
import { signer, patientVC } from './patientCertificate'
import { IDpatientVC } from'./IDCertificate'
//import vcsigner from '../credentials/patient/VCsigner.json'

const yourPrivateKey = 'xprv9s21ZrQH143K4Hahxy3chUqrrHbCynU5CcnRg9xijCvCG4f3AJb1PgiaXpjik6pDnT1qRmf3V3rzn26UNMWDjfEpUKL4ouy6t5ZVa4GAJVG' // Todo: Load your private key here
const cryptAlgorithm = new LocalCryptUtils() // secp256k1 algorithm
// hay que pasarle el crypt util y el signer del vc
const vpsigner = new VerifiablePresentationSigner(cryptAlgorithm, signer)
const generator = new VerifiablePresentationGenerator(vpsigner)

const existingVerifiableCredentials: VerifiableCredential[] = [patientVC, IDpatientVC] // Todo: Retrieve your VerifiableCredentials from storage!

// Creating a VerifiablePresentation object:
const keys = [{ accountId: 0, keyId:0 }]
cryptAlgorithm.importMasterPrivateKey(yourPrivateKey)
//const address = cryptAlgorithm.deriveAddress(0,0)

//console.log(address)
const IDpatientVP = generator.generateVerifiablePresentation({
  '@context': ["https://www.w3.org/2018/credentials/v1",
  "http://schema.org"],
  id: 'urn:uuid:0xE1f6a9A0F05373EC4Ca76FD5F6dd8D0308Ba9de4',
  type: ['VerifiablePresentation'],
  verifiableCredential: existingVerifiableCredentials
}, keys)

console.log("IDPATIENTVP ----------------------")
// The generator attaches one proof object for each verifiableCredential, so the credential ownership becomes cryptographically verifiable.
console.log(JSON.stringify(IDpatientVP, null, 2))

console.log("VERIFICATION ----------------------")
// Validating a VerifiablePresentation object:
console.log(vpsigner.verifyVerifiablePresentation(IDpatientVP)) // true or false