# crypt-util

[![Build Status](https://travis-ci.org/rabobank-blockchain/crypt-util.svg?branch=master)](https://travis-ci.org/rabobank-blockchain/crypt-util)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e2d5b3d8852dd5c96d7b/test_coverage)](https://codeclimate.com/github/rabobank-blockchain/crypt-util/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/e2d5b3d8852dd5c96d7b/maintainability)](https://codeclimate.com/github/rabobank-blockchain/crypt-util/maintainability)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A TypeScript/JavaScript API for dealing with cryptographic functions for browser and NodeJS. It implements the interface `CryptUtil`.

The crypt-util library provides an implementation for local (on-device) usage, but is not responsible for the secure storage of any private keys.
The local implementation creates derivable ECDSA keys which can also be used with an Ethereum network.

## Installation

In an existing project (with `package.json`), install `crypt-util`

```bash
npm install crypt-util --save
```

## Usage

### Creating, importing and exporting keys

A new (random) key can be created. This implementation allows for importing and exporting the keys, so that they can be stored on a local storage or used in an external lib.

```typescript
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
```

### Key derivation

Key derivation with the out-of-the-box implementation is done according to [BIP0044](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki). We use the derived private keys and addresses with an Ethereum blockchain. Key derivation takes as input the variables `accountId` and `keyId`.
The key path will be formed as follows `m/44'/60'/<accountid>'/0'/<keyid>'`. The `accountId` can be used if your application offers multiple accounts/profiles for one user. Leave `accountId = 0` when unused.

```typescript
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
```

### Signing and verifying

The `secp256k1` signing algorithm is used over a `keccak256` hash from a given payload. A hexadecimal representation of the signature is returned.

```javascript
// Don't forget to import your private key!

// Sign a payload with a derived key
const signature = cryptUtils.signPayload(payload, account, index)
console.log(signature)

// Verify payload and signature
const verified = cryptUtils.verifyPayload(payload, pubKey, signature)
console.log(verified)
```

### Different crypto algorithms

Build a new class yourself, implementing the [crypt-util](src/interface/crypt-util.ts) interface using the cryptographic algorithm of your choice.
As of now, only the secp256k1 algorithm is available out-of-the-box.

## Running tests

Besides unit testing with Mocha, the effectivity of all tests are also measured with the Stryker mutation testing framework.

```bash
npm run test
npm run stryker
```

We aim to achieve a coverage of 100%. Stryker and/or mocha test scores below 80% will fail the build.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License and disclaimer

[apache-2.0](https://choosealicense.com/licenses/apache-2.0/) with a [notice](NOTICE).

We discourage the use of this work in production environments as it is in active development and not mature enough.
