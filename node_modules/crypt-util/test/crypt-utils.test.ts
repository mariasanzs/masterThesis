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

// @ts-ignore
import * as HDKey from 'hdkey'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as sinon from 'sinon'
import { CryptUtil, LocalCryptUtils } from '../src'

const assert = chai.assert

before(() => {
  chai.should()
  chai.use(chaiAsPromised)
})

describe('cryptutils class', () => {
  let sut: CryptUtil = new LocalCryptUtils()

  afterEach(() => {
    sinon.restore()
    sut = new LocalCryptUtils()
  })

  it('should construct succesfully', () => {
    // Arrange + Act
    const createSut = function () {
      return new LocalCryptUtils()
    }

    // Assert
    assert.doesNotThrow(createSut)
  })

  it('should create a master private key without throwing', () => {
    // Arrange
    const createMasterPrivKeyAction = function () {
      sut.createMasterPrivateKey()
    }
    // Act + Assert
    assert.doesNotThrow(createMasterPrivKeyAction)
  })

  it('should return hardcoded algorithmName', () => {
    assert.equal(sut.algorithmName, 'secp256k1')
  })

  it('should import a masterprivatekey', () => {
    // Arrange
    const stub = sinon.stub(HDKey, 'fromExtendedKey')
    const privKey = 'fromExtendedKey'
    // Act
    sut.importMasterPrivateKey(privKey)
    // Assert
    assert.isTrue(stub.calledOnceWithExactly(privKey))
  })

  it('should throw an error if hdkey cannot create a masterprivatekey', () => {
    // Arrange
    sinon.stub(HDKey, 'fromMasterSeed').returns(false)
    const helper = function () {
      sut.createMasterPrivateKey()
    }

    // Act / Assert
    assert.throws(helper, 'Could not create master private key')
  })

  it('should should return a corresponding private extended key', () => {
    // Arrange
    sut.createMasterPrivateKey()
    // Act
    const privExtKey = sut.exportMasterPrivateKey()
    // Assert
    assert.isString(privExtKey)
    assert.equal(privExtKey.substr(0, 4), 'xprv')
  })

  it('should generate a derived public key starting without 0x and a length of 60 characters', () => {
    // Act
    sut.createMasterPrivateKey()
    const pubKey = sut.derivePublicKey(0, 1)
    // Assert
    assert.isString(pubKey)
    assert.isAtLeast(pubKey.length, 128)
  })

  it('should generate a derived public extended key', () => {
    // Act
    sut.createMasterPrivateKey()
    const pubExtendedKey = sut.derivePublicExtendedKey(0, 1)
    // Assert
    assert.isString(pubExtendedKey)
    assert.equal(pubExtendedKey.substr(0, 4), 'xpub')
    assert.equal(pubExtendedKey.length, 111)
  })

  it('should calculate the address out of a public key', () => {
    // Arrange
    const pubkey = '5c1d9376dd92af86696de24806477a40c21291831840a220da1eac511c758c28553456e13ea0057641aa2dc4e66cfffbd49ae3a316f933f6613f87bf7e8fdf77'
    const matchingAddress = '0xdA2B12cED8B2fc19c5abEF68aC99F55616BC98eB'

    // Act & Assert
    assert.equal(sut.getAddressFromPubKey(pubkey), matchingAddress)
  })

  it('should generate a derived address starting with 0x and a length of 42 characters', () => {
    // Arrange
    const account = 0
    const keyId = 3
    // Act
    sut.createMasterPrivateKey()
    const address = sut.deriveAddress(account, keyId)
    // Assert
    assert.isString(address)
    assert.equal(address.substr(0, 2), '0x')
    assert.equal(address.length, 42)
  })

  it('should generate a derived private key starting with 0x and a length of 60 characters', () => {
    // Act
    sut.createMasterPrivateKey()
    const privKey = sut.derivePrivateKey(0, 1)
    // Assert
    assert.isString(privKey)
    assert.isAtLeast(privKey.length, 60)
  })

  it('should sign a payload and return the signature', () => {
    // Arrange
    const payload = 'This is a test'
    sut.createMasterPrivateKey()
    // Act
    const signature = sut.signPayload(0, 1, payload)
    // Assert
    assert.isString(signature)
    assert.notEqual(signature, '')
  })

})
