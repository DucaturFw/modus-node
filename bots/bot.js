const Web3 = require('web3')
const Big = require('big.js')
const EthUtil = require('ethereumjs-util')
const RIPEMD160 = require('ripemd160')
const crypto = require('crypto')

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

class Auction {
    constructor(config, mainWeb3, auctionWeb3, lot, tokens, bets, secret, bet) {
        this.config = config
        this.mainWeb3 = mainWeb3
        this.auctionWeb3 = auctionWeb3
        this.lot = lot
        this.tokens = tokens
        this.bets = bets
        this.secret = secret
        this.bet = bet
        this.status = 'none'

        this.log('Start monitoring auction')
        this.checkWin()
    }

    checkWin() {
        this.log('Check win')

        const abi = require(`../abis/${this.config.auction.auction.abi}`)
        const contract = new this.auctionWeb3.eth.Contract(abi, this.config.auction.auction.address)

        const repeat = () => {
            setTimeout(() => {
                this.checkWin()
            }, 10000)
        }

        console.log(this.lot)

        contract.methods.getWinningBet(this.lot).call({
            from: ethereumAddress(this.config.auction.secret)
        }).then(res => {
            this.log(`Win bet: ${res}`)
            this.log(`My bet: ${this.bet}`)

            const bet = parseInt(res)
            if (bet == parseInt(this.bet)) {
                this.status = 'win'
                this.log(`Win #${this.lot}`)
                this.handleWin()
            } else {
                this.status = 'lose'
                this.log(`Lose #${this.lot}`)
            }
        }).catch(err => {
            this.error(err)
            console.error(err)
            repeat()
        })
    }

    handleWin() {
        let tasks = []

        for (let i = 0; i < this.tokens.length; i++) {
            tasks.push({
                token: this.tokens[i],
                amount: this.bets[i]
            })
        }

        console.log(tasks)
        this.executeTask(tasks)
    }

    executeTask(tasks) {
        if (tasks.length == 0) {
            this.executeFinal()
        } else {
            const task = tasks.shift()

            console.log(task)

            const erc20ABI = require('../abis/erc20.json')
            const erc20 = new this.mainWeb3.eth.Contract(erc20ABI, task.token)
        
            erc20.methods.transfer(this.config.main.ft.address, task.amount).send({
                from: ethereumAddress(this.config.main.secret),
                gas: '1000000'
            }, (err, res) => {
                if (err) {
                    return console.error(err)
                }
          
                console.log(res)

                this.executeTask(tasks)
            })
        }
    }

    executeFinal() {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        console.log('FtID:', this.lot)
        console.log('Secret:', this.secret)
        
        const abi = require(`../abis/${this.config.main.ft.abi}`)
        const contract = new this.mainWeb3.eth.Contract(abi, this.config.main.ft.address)

        contract.methods.swap(this.lot, EthUtil.bufferToHex(this.secret))
            .send({
                from: ethereumAddress(this.config.main.secret),
                gas: '2000000'
            })
            .on('transactionHash', tx => {
                console.log(tx)
            })
            .once('receipt', receipt => {
                console.log(receipt)
            })
            .on('error', err => {
                console.error(err)
            })
    }

    log(text) {
        console.log(`${this.config.name}: ${text}`)
    }

    error(err) {
        console.error(`${this.config.name}: ${err}`)
    }
}

class Bot {
    constructor(config) {
        this.config = config
        this.mainWeb3 = this.initWeb3(config.main)
        this.auctionWeb3 = this.initWeb3(config.auction)
        this.auctions = []
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
        this.log('Started')
    }

    listenLot() {
        const abi = require(`../abis/${this.config.auction.auction.abi}`)
        const contract = new this.auctionWeb3.eth.Contract(abi, this.config.auction.auction.address)

        contract.events.CreateLot()
            .on('data', event => {
                this.log('events.CreateLot: on data')
                this.handleLot(event)
            })
            .on('changed', event => {
                this.log('events.CreateLot: on changed')
            })
            .on('error', err => {
                this.log(`events.CreateLot: on error: ${err}`)
            })
    }

    handleLot(event) {
        const lot = event.returnValues.lot
        const total = parseFloat(Web3.utils.fromWei(event.returnValues.amountETH))

        this.log(`Handle lot: #${lot}`)
        this.log(`Total: ${total.toFixed(8)} ETH`)

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

                this.log(`${botToken.name}: ${amount.toFixed(4)} ${botToken.symbol} to bet: ${bet}`)
            } else {
                this.log('Does not have token:', token)
                return
            }
        }

        this.bet(lot, event.returnValues.tokens, bets)
    }

    bet(lot, tokens, bets) {
        const abi = require(`../abis/${this.config.auction.auction.abi}`)
        const contract = new this.auctionWeb3.eth.Contract(abi, this.config.auction.auction.address)

        const secret = crypto.randomBytes(32)
        const hash = EthUtil.bufferToHex(new RIPEMD160().update(secret).digest())

        this.log(`methods.createBet: #${lot}`)

        console.log('-----------------')
        console.log(lot)
        console.log(tokens)
        console.log(bets)
        console.log(hash)

        contract.methods.createBet(lot, bets, hash)
            .send({
                from: ethereumAddress(this.config.auction.secret),
                gas: '2000000'
            })
            .on('transactionHash', tx => {
                this.log(`methods.createBet.on.tx: ${tx}`)
            })
            .once('receipt', receipt => {
                const bet = receipt.events.CreateBet.returnValues.bet
                this.log(`methods.createBet.on.receipt: #${lot} ${bet}`)

                if (receipt.events.CreateBet) {
                    const auction = new Auction(
                        this.config,
                        this.mainWeb3,
                        this.auctionWeb3,
                        lot,
                        tokens,
                        bets,
                        secret,
                        bet
                    )
                    this.auctions.push(auction)
                }
            })
            .on('error', err => {
                console.error(err)
                this.error(`methods.createBet.on.error: ${err}`)
            })
    }

    log(text) {
        console.log(`${this.config.name}: ${text}`)
    }

    error(err) {
        console.error(`${this.config.name}: ${err}`)
    }
}

module.exports = Bot
