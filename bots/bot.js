const Web3 = require('web3')
const Big = require('big.js')
const EthUtil = require('ethereumjs-util')
const RIPEMD160 = require('ripemd160')
const uuidv4 = require('uuid/v4')

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

class Auction {

}

class Bot {
    constructor(config) {
        this.config = config
        this.mainWeb3 = this.initWeb3(config.main)
        this.auctionWeb3 = this.initWeb3(config.auction)
    }

    initWeb3(config) {
        const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ws))
        const account = web3.eth.accounts.privateKeyToAccount(config.secret)
        web3.eth.accounts.wallet.add(account)
        web3.eth.defaultAccount = account.address
        return web3
    }

    run() {
        this.listenLot()
    }

    listenLot() {
        const abi = require(`../abis/${this.config.auction.auction.abi}`)
        const contract = new this.auctionWeb3.eth.Contract(abi, this.config.auction.auction.address)

        contract.events.CreateLot()
            .on('data', event => {
                this.handleLot(event)
            })
            .on('error', err => {
                console.log(err)
            })
    }

    handleLot(event) {
        const total = parseFloat(Web3.utils.fromWei(event.returnValues.amountETH))
        console.log(`Total: ${total.toFixed(8)} ETH`)

        let bets = []

        for (let i = 0; i < event.returnValues.tokens.length; i++) {
            let token = event.returnValues.tokens[i].toLowerCase()
            let part = parseFloat(event.returnValues.parts[i])

            if (this.config.tokens[token]) {
                let botToken = this.config.tokens[token]
                let value = total * part
                let amount = value / botToken.price
                let bet = ((new Big(amount)).times((new Big(10)).pow(botToken.decimal))).toFixed(0)
                bets.push(bet)

                console.log(`${botToken.name}: ${amount.toFixed(4)} ${botToken.symbol} to bet: ${bet}`)
            } else {
                console.log('Does not have token:', token)
                return
            }
        }

        this.bet(event.returnValues.lot, bets)
    }

    bet(lot, bets) {
        const abi = require(`../abis/${this.config.auction.auction.abi}`)
        const contract = new this.auctionWeb3.eth.Contract(abi, this.config.auction.auction.address)

        const uuid = uuidv4()
        const secret = Buffer.from(uuid, 'utf-8')
        const hash = EthUtil.bufferToHex(new RIPEMD160().update(secret).digest())

        console.log(lot)
        console.log(bets)
        console.log(hash)
        console.log(uuid)

        contract.methods.createBet(lot, bets, hash)
            .send({
                from: ethereumAddress(this.config.auction.secret),
                gas: '2000000'
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
    }
}

module.exports = Bot
