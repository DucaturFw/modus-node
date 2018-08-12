const Web3 = require('web3')
const ethUtil = require('ethereumjs-util')
const ethTx = require('ethereumjs-tx')

function bingo() {
    var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'))

    const privateKey = 'ebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f';
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const erc20ABI = require('../abis/erc20.json')
    const erc20 = new web3.eth.Contract(erc20ABI, '0x52d910bfcac51982b884b90891445fa16d5af3d9')

    erc20.methods.transfer('0xC9A73Ce5FAE743fab398f4dE903D4F005A149FDb', '10000').send({
        from: '0xabfebc151261808ecfbdcba4cba111f89ed9ff0c',
        gas: '50000'
    }, (err, res) => {
        console.error(err)
        console.log(res)
    })


/*
    web3.eth.sendTransaction({  
        from: '0xabfebc151261808ecfbdcba4cba111f89ed9ff0c',
    to: '0xC9A73Ce5FAE743fab398f4dE903D4F005A149FDb',
    value: '100000000000000000',

    'gas': '2000000'
}).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err)
    })
    */
}



bingo()
return

//console.log(web3.eth.accounts)

//retur 

const privKey = new Buffer("ebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f", "hex")
const tokenAbi = require('../abis/erc20.json')
const tokenAddress = '0x52d910bfcac51982b884b90891445fa16d5af3d9'
const receiverAddress = '0xC9A73Ce5FAE743fab398f4dE903D4F005A149FDb'

function getEthereumAddress(privKey) {
    let addressHex = ethUtil.privateToAddress(privKey)
    return ethUtil.bufferToHex(addressHex)
}

amount = '1000000000000000000'

const senderAddress = getEthereumAddress(privKey);
const contract = new web3.eth.Contract(tokenAbi, tokenAddress);
const bytecode = contract.methods.transfer(receiverAddress, amount).encodeABI();
const tx = new ethTx({
    to: tokenAddress,
    from: senderAddress,
    value: Web3.utils.toHex(0),
    gasLimit: Web3.utils.toHex(Web3.utils.toBN('3000000')),
    gasPrice: Web3.utils.toHex(Web3.utils.toWei('1', 'gwei')),
    nonce: Web3.utils.toHex(5),
    data: bytecode
});
tx.sign(privKey);
const txSerialized = '0x' + tx.serialize().toString('hex');

console.log(txSerialized)

web3.eth.sendSignedTransaction(txSerialized, (err, res) => {
    console.log(err)
    console.log(res)
})

