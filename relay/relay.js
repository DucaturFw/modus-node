const config = require('../config')

const Web3 = require('web3')
const EthUtil = require('ethereumjs-util')

function ethereumAddress(secret) {
    return EthUtil.bufferToHex(EthUtil.privateToAddress(EthUtil.toBuffer(secret)))
}

function createWeb3(config) {
    const web3 = new Web3(new Web3.providers.WebsocketProvider(config.ws))
    const account = web3.eth.accounts.privateKeyToAccount(config.secret)
    web3.eth.accounts.wallet.add(account)
    web3.eth.defaultAccount = account.address
    return web3
}

const mainWeb3 = createWeb3({ ws: config.main.ws, secret: config.main.relay.secret })
const auctionWeb3 = createWeb3({ ws: config.auction.ws, secret: config.auction.relay.secret })

const ftABI = require(`../abis/${config.main.contracts.ft.abi}`)
const ft = new mainWeb3.eth.Contract(ftABI, config.main.contracts.ft.address)

const auctionABI = require(`../abis/${config.auction.contracts.auction.abi}`)
const auction = new auctionWeb3.eth.Contract(auctionABI, config.auction.contracts.auction.address)

console.log('Start listening')
console.log(config.main.contracts.ft)

ft.events.NewToken()
    .on('data', event => {
        handleNewToken(event)
    })
    .on('changed', event => {
        console.log(event)
    })
    .on('error', err => {
        console.error(err)
    })

function handleNewToken(event) {
    console.log('Handle New Token')
    const values = event.returnValues
    createLot(
        values.tokenId,
        values.tokens,
        values.parts,
        values.stake
    )
}

function createLot(ftId, tokens, parts, stake) {
    console.log(`Create Lot #${ftId}`)

    auction.methods.createLot(ftId, tokens, parts, stake)
    .send({
        from: ethereumAddress(config.auction.relay.secret),
        gas: 3000000
    })
    .on('transactionHash', tx => {
        console.log(tx)
    })
    .on('receipt', receipt => {
        console.log(receipt)

        setTimeout(() => {
            checkLot(ftId)
        }, 15000)
    })
    .on('error', err => {
        console.error(err)
    })
}

function checkLot(ftId) {
    console.log(`Check Lot #${ftId}`)

    auction.methods.getWinningBet(ftId).call({
        from: ethereumAddress(config.auction.relay.secret)
    }).then(res => {
        if (parseInt(res) > 0) {
            console.log(`Won bet ${res} on #${ftId}`)
            getLotInfo(ftId, parseInt(res))
        }
    }).catch(err => {
        console.error(err)
    })
}

function getLotInfo(ftId, bet) {
    console.log('Get Lot Info')

    auction.methods.getWinBetInfo(ftId).call({
        from: ethereumAddress(config.auction.relay.secret)
    }).then(res => {
        console.log(res)
        setWinner(ftId, res.score, res.secretHash)
    }).catch(err => {
        console.error(err)
    })
}

function setWinner(ftId, tokenValue, secretHash) {
    console.log('Set Winner')

    console.log(ftId)
    console.log(tokenValue)
    console.log(secretHash)

    console.log(ethereumAddress(config.main.relay.secret))

    ft.methods.setWinner(ftId, tokenValue, secretHash)
    .send({
        from: ethereumAddress(config.main.relay.secret),
        gas: 3000000
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
