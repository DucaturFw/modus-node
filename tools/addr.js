const EthUtil = require('ethereumjs-util')

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

const secret = '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'

console.log(ethereumAddress(secret))
