const EthUtil = require('ethereumjs-util')

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

const secret = '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533'

// Demo
console.log(ethereumAddress('0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'))
console.log(ethereumAddress('0xa69343cfe238406702b6e4cb6ebb35e92c08fb1e4ea42bda4ba1700803966c6d'))
console.log(ethereumAddress('0x9ffd3c522699f25cc096095ae45cfdeae8bfb81c43335b0edf4fff4f4963fc65'))
