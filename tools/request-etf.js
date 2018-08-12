const config = {
    ws: 'wss://ropsten.infura.io/ws',
    abi: 'ft.json',
    address: '0x9a191196407d7023a7f074e367702762264a7c23',
    secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'
}

const EthUtil = require('ethereumjs-util')

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ws))

const account = web3.eth.accounts.privateKeyToAccount(config.secret)
web3.eth.accounts.wallet.add(account)
web3.eth.defaultAccount = account.address

const ftABI = require(`../abis/${config.abi}`)
const ft = new web3.eth.Contract(ftABI, config.address)

const tokens = [
    '0x131fc9e0314d16904ebc1b5005155b8fc90a093f',
    '0x82ef3dbdee71bb9ccf98eec777180ffb58f0c8a7'
]
const parts = [
    80,
    20
]

ft.methods.createToken(tokens, parts)
    .send({
        from: ethereumAddress(config.secret),
        gas: '4000000',
        value: web3.utils.toWei('0.01', 'ether')
    })
    .on('transactionHash', tx => {
        console.log(tx)
    })
    .once('receipt', receipt => {
        console.log(receipt)
    })
    .on('error', err => {
        console.error(err)
    })