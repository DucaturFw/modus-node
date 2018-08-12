const Web3 = require('web3')

const config = require('../config')

const mainProvider = new Web3.providers.WebsocketProvider(config.main.ws)
const mainWeb3 = new Web3(mainProvider)

const mainFactoryABI = require(`../abis/${config.main.factory.abi}`)
const mainEthABI = require(`../abis/${config.main.etf.abi}`)

const mainFactory = new mainWeb3.eth.Contract(mainFactoryABI, config.main.factory.address)

const eth = new mainWeb3.eth.Contract(mainEthABI, '0xec39c87ED58129223Bf9303604df904064cD6220')
eth.methods.getRequest().call({}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
