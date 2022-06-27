import { LocalCryptUtils } from 'crypt-util'
import { VerifiableCredentialSigner, VerifiableCredentialGenerator, VerifiablePresentationSigner } from 'vp-toolkit'
import { CredentialStatus } from 'vp-toolkit-models'


const yourPrivateKey = 'xprv9s21ZrQH143K2LGT5KeWPddxBVLs42oAr6QZwGUoL7Xe5BiLyKG1B8QyyCByHH5DM96GuJpHHB4pZYLXbpMeE17Di4F37v8LspL3JnHB8LC'
const cryptAlgorithm = new LocalCryptUtils() // secp256k1 algorithm
const signer = new VerifiableCredentialSigner(cryptAlgorithm)
const generator = new VerifiableCredentialGenerator(signer)

// Creating a VerifiableCredential object:
cryptAlgorithm.importMasterPrivateKey(yourPrivateKey)
const verifiableCredential = generator.generateVerifiableCredential({
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://schema.org/givenName'],
  id: 'credential-name-or-identifier',
  type: ['VerifiableCredential', 'SomeOtherType'],
  issuer: 'did:protocol:0x9c6a28B1a933acF8683574655fAfF1Ce09D11B4c',
  issuanceDate: new Date(Date.UTC(2019, 0, 1, 23, 34, 56)),
  credentialSubject: {
    id: 'did:eth:holderaddress',
    givenName: 'John'
  },
  credentialStatus: new CredentialStatus({
    id: '0xE1f6a9A0F05373EC4Ca76FD5F6dd8D0308Ba9de4', // The pointer to the registry. In this case, a smart contract address.
    type: 'vcStatusRegistry2019' // The type so the correct implementation can check for DID revocations
  })
}, 0, 0)

// The generator attaches a proof object to the verifiableCredential so it becomes cryptographically verifiable.

console.log(JSON.stringify(verifiableCredential, null, 2))

//const publicKey = '640646fe0502b3a4191d7431da781a2c1da4dea2af9f650c88792e39943944909fd915209836b3c7d83223f8d68077c8e5bbda5d5546f484b166a3248add9489'
//const addressFromSigner = '' + cryptAlgorithm.getAddressFromPubKey(publicKey)
//console.log(addressFromSigner)

// Validating a VerifiableCredential object:
console.log(signer.verifyVerifiableCredential(verifiableCredential)) // true or false