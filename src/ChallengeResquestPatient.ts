import { LocalCryptUtils } from 'crypt-util'
import { ChallengeRequestSigner, ChallengeRequestGenerator } from 'vp-toolkit'
const yourPrivateKey = 'xprv9s21ZrQH143K2LGT5KeWPddxBVLs42oAr6QZwGUoL7Xe5BiLyKG1B8QyyCByHH5DM96GuJpHHB4pZYLXbpMeE17Di4F37v8LspL3JnHB8LC' // Todo: Load your private key here
const cryptAlgorithm = new LocalCryptUtils() // secp256k1 algorithm
const signer = new ChallengeRequestSigner(cryptAlgorithm)
const generator = new ChallengeRequestGenerator(signer)

// Creating a ChallengeRequest object:
cryptAlgorithm.importMasterPrivateKey(yourPrivateKey)
const challengeRequest = generator.generateChallengeRequest({
  toAttest: 'http://schema.org/identifier',
  toVerify: 'http://schema.org/identifier',
  postEndpoint: 'https://domain.org/ssif/verifiable-presentation-endpoint'
}, 0, 0)
// You can use toAttest and toVerify both at the same time, for instance if you require some credentials before issuing.

console.log(JSON.stringify(challengeRequest, null, 2))

// Validating a ChallengeRequest object:
console.log(signer.verifyChallengeRequest(challengeRequest)) // true or false