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

// Create contract in quote
// Crea

/*
Result {
    '0': 
     [ '0x43d041D4c8b83C5B70Fa06e1415AbA361f89d2BC',
       '0x325ea5972BB0Fa21d13FDE235B1A0F47D3b95181' ],
    '1': [ '37', '70' ],
    _tokens: 
     [ '0x43d041D4c8b83C5B70Fa06e1415AbA361f89d2BC',
       '0x325ea5972BB0Fa21d13FDE235B1A0F47D3b95181' ],
    _weights: [ '37', '70' ] }

    */