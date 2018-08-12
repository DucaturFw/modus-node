const EthUtil = require('ethereumjs-util')
const uuidv4 = require('uuid/v4')

const privateKey = '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'



function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}


const RIPEMD160 = require('ripemd160')

const uuid = uuidv4()
const secret = Buffer.from(uuid, 'utf-8')
const hash = new RIPEMD160().update(secret).digest()

console.log(hash)

//console.log(ethereumAddress(privateKey))