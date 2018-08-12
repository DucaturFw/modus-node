const config = require('../config')
const RIPEMD160 = require('ripemd160')

const Web3 = require('web3')

const provider = new Web3.providers.WebsocketProvider(config.auction.ws)
const web3 = new Web3(provider)

const auctionABI = require(`../abis/${config.auction.auction.abi}`)
const auction = new web3.eth.Contract(mainFactoryABI, config.auction.auction.address)



auction.events.NeedBet()
.on('data', event => {

})
.on('error', err => {
    console.log(err)
})

/*
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