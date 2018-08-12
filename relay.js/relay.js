const config = require('../config')

const Web3 = require('web3')

const mainProvider = new Web3.providers.WebsocketProvider(config.main.ws)
const mainWeb3 = new Web3(mainProvider)

const mainFactoryABI = require(`../abis/${config.main.factory.abi}`)
const mainEthABI = require(`../abis/${config.main.etf.abi}`)

const mainFactory = new mainWeb3.eth.Contract(mainFactoryABI, config.main.factory.address)

mainFactory.events.NewToken().on('data', event => {
    console.log(event.returnValues.token)
    const eth = new mainWeb3.eth.Contract(mainEthABI, event.returnValues.token) 
    eth.methods.getRequest().call({}).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}).on('error', err => {
    console.error(err)
})
