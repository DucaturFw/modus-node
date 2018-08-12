const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'))

const secret = 'ebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'
const account = web3.eth.accounts.privateKeyToAccount('0x' + secret)
web3.eth.accounts.wallet.add(account)
web3.eth.defaultAccount = account.address

const etfABI = require('../abis/eth_flat.json')
const etf = new web3.eth.Contract(etfABI, '0x7371ea969af4bc5b8ac03cbd3dcbb654003a8ffe')

etf.methods.createToken(["0xc9a73ce5fae743fab398f4de903d4f005a149fdb","0xc9a73ce5fae743fab398f4de903d4f005a149fdb"],[20,80])
.send({
    value: web3.utils.toWei('0.1', 'ether'),
    from: '0xabfebc151261808ecfbdcba4cba111f89ed9ff0c',
    gas: 3000000
})
.on('receipt', receipt => console.log)
.on('error', error => console.error)
