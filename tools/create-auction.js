const glConfig = require('../config')

const Web3 = require('web3')

const config = {
    ws: glConfig.auction.ws,
    secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
    abi: glConfig.auction.contracts.auction.abi,
    address: glConfig.auction.contracts.auction.address
}

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ws))

const account = web3.eth.accounts.privateKeyToAccount(config.secret)
web3.eth.accounts.wallet.add(account)
web3.eth.defaultAccount = account.address

const abi = require(`../abis/${config.abi}`)
const contract = new web3.eth.Contract(abi, config.address)


const amount = Web3.utils.toWei('0.01', 'ether')
const tokens = [
    "0x6e8c1223e027de8e9a7f9b910ad6190458a1ce5e", 
    "0x4133bc0d26756ca12eb06d2dc7cfbdac2d9595fb", 
    '0xa17fafbab3a66262509c27bf4430bb4ec86af33a', 
    '0xe403a838cfe077ba2cfd24c1d04a7e8648377f13'
]

const parts = [
    25, 25, 25, 25
]

contract.methods.createLot(tokens, parts, amount, 10)
    .send({
        from: ethereumAddress(config.secret),
        gas: 3000000
    })
    .on('transactionHash', tx => {
        console.log(tx)
    })
    .on('receipt', receipt => {
        console.log(receipt)
    })
    .on('error', err => {
        console.error(err)
    })
