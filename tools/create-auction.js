const Web3 = require('web3')

const config = {
    ws: 'wss://ropsten.infura.io/ws',
    secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
    abi: 'simple_a.json',
    address: '0xbb6dbb073d6aa48166bf374980c2239ddb4446a3'
}

const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ws))

const account = web3.eth.accounts.privateKeyToAccount(config.secret)
web3.eth.accounts.wallet.add(account)
web3.eth.defaultAccount = account.address

const abi = require(`../abis/${config.abi}`)
const contract = new web3.eth.Contract(abi, config.address)

const params = {}

const amount = Web3.utils.toWei('0.01', 'ether')

contract.methods.createLot(["0x6e8c1223e027de8e9a7f9b910ad6190458a1ce5e", "0x4133bc0d26756ca12eb06d2dc7cfbdac2d9595fb", '0xa17fafbab3a66262509c27bf4430bb4ec86af33a', '0xe403a838cfe077ba2cfd24c1d04a7e8648377f13'], [25, 25, 25, 25], amount, 10)
    .send({
        from: '0xabfebc151261808ecfbdcba4cba111f89ed9ff0c',
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

    /*
etf.methods.createToken(["0xc9a73ce5fae743fab398f4de903d4f005a149fdb", "0xc9a73ce5fae743fab398f4de903d4f005a149fdb"], [20, 80])
    .send({
        value: web3.utils.toWei('0.1', 'ether'),
        from: '0xabfebc151261808ecfbdcba4cba111f89ed9ff0c',
        gas: 3000000
    })
    .on('receipt', receipt => console.log)
    .on('error', error => console.error)
*/

