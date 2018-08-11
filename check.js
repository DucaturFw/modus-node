const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))

web3.eth.getBlockNumber((err, res) => {
    if (err) {
        return console.error(err)
    }
    console.log(res)
})
