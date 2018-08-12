const config = require('../config')

const Web3 = require('web3')

const mainWeb3 = new Web3(new Web3.providers.WebsocketProvider(config.main.ws))
const auctionWeb3 = new Web3(new Web3.providers.WebsocketProvider(config.auction.ws))

const ftABI = require(`../abis/${config.main.contracts.ft.abi}`)
const ft = new mainWeb3.eth.Contract(ftABI, config.main.contracts.ft.address)

ft.events.NewToken()
    .on('data', event => {
        console.log(event)
    })
    .on('changed', event => {
        console.log(event)
    })
    .on('error', err => {
        console.error(err)
    })

    /*

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

*/
