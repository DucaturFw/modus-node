const EthUtil = require('ethereumjs-util')

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

const secret = '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533'

console.log(ethereumAddress(secret))
