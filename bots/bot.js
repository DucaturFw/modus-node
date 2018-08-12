const Web3 = require('web3')
const ethUtil = require('ethereumjs-util')
const ethTx = require('ethereumjs-tx')

class Bot {
    constructor(config) {
        this.config = config
    }

    run() {
        this.listenLot()
        this.listenWin()
    }

    // Lot

    listenLot() {
        const provider = new Web3.providers.WebsocketProvider(config.auction.ws)
        const web3 = new Web3(provider)

        const abi = require(`../abis/${config.auction.auction.abi}`)
        const contract = new web3.eth.Contract(abi, config.auction.auction.address)

        contract.events.CreateLot()
        .on('data', event => {
            this.handleLot(event)
        })
        .on('error', err => {
            console.log(err)
        })    
    }

    handleLot(event) {

    }

    bet() {

    }

    // Win

    listenWin() {
        const provider = new Web3.providers.WebsocketProvider(config.auction.ws)
        const web3 = new Web3(provider)

        const abi = require(`../abis/${config.auction.auction.abi}`)
        const contract = new web3.eth.Contract(abi, config.auction.auction.address)

        contract.events.Win()
        .on('data', event => {
            this.handleWin(event)
        })
        .on('error', err => {
            console.log(err)
        })
    }

    handleWin(event) {

    }

    bingo() {
        
    }
}

module.exports = Bot
