import { LocalCryptUtils } from 'crypt-util'
import { VerifiablePresentationSigner, VerifiablePresentationGenerator } from 'vp-toolkit'
import { VerifiableCredentialSigner, VerifiableCredentialGenerator } from 'vp-toolkit'
import { VerifiableCredential } from 'vp-toolkit-models'



const yourPrivateKey = 'xprv9s21ZrQH143K2LGT5KeWPddxBVLs42oAr6QZwGUoL7Xe5BiLyKG1B8QyyCByHH5DM96GuJpHHB4pZYLXbpMeE17Di4F37v8LspL3JnHB8LC'
const cryptAlgorithm = new LocalCryptUtils() // secp256k1 algorithm
const csigner = new VerifiableCredentialSigner(cryptAlgorithm)
const signer = new VerifiablePresentationSigner(cryptAlgorithm,csigner)
const generator = new VerifiablePresentationGenerator(signer)

const existingVerifiableCredentials: VerifiableCredential[] = [] // Todo: Retrieve your VerifiableCredentials from storage!

// Creating a VerifiablePresentation object:
cryptAlgorithm.importMasterPrivateKey(yourPrivateKey)
const verifiablePresentation = generator.generateVerifiablePresentation({
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  id: 'urn:uuid:3978344f-8596-4c3a-a978-8fcaba3903c5',
  type: ['VerifiablePresentation'],
  verifiableCredential: existingVerifiableCredentials
}, 0, 0)

// The generator attaches one proof object for each verifiableCredential, so the credential ownership becomes cryptographically verifiable.

console.log(JSON.stringify(verifiablePresentation, null, 2))

// Validating a VerifiablePresentation object:
console.log(signer.verifyVerifiablePresentation(verifiablePresentation)) // true or false