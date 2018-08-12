const config = require('../config')

const Bot = require('./bot')

const seeta = new Bot({
    name: 'Seeta',
    main: {
        ws: config.main.ws,
        ft: config.main.contracts.ft,
        secret: config.main.bots.seeta
    },
    auction: {
        ws: config.auction.ws,
        auction: config.auction.contracts.auction,
        secret: config.auction.bots.seeta
    },
    tokens: {
        '0x131fc9e0314d16904ebc1b5005155b8fc90a093f': {
            name: 'Maker',
            symbol: 'MKR',
            decimal: 4,
            address: '0x131fc9e0314d16904ebc1b5005155b8fc90a093f',
            price: 1.46
        },
        '0x82ef3dbdee71bb9ccf98eec777180ffb58f0c8a7': {
            name: 'OmiseGO',
            symbol: 'OMG',
            decimal: 4,
            address: '0x82ef3dbdee71bb9ccf98eec777180ffb58f0c8a7',
            price: 0.013
        },
        '0xa17fafbab3a66262509c27bf4430bb4ec86af33a': {
            name: 'StatusNetwork',
            symbol: 'SNT',
            decimal: 4,
            address: '0xa17fafbab3a66262509c27bf4430bb4ec86af33a',
            price: 0.00013
        },
        '0xe403a838cfe077ba2cfd24c1d04a7e8648377f13': {
            name: 'Bancor',
            symbol: 'BNT',
            decimal: 4,
            address: '0xe403a838cfe077ba2cfd24c1d04a7e8648377f13',
            price: 0.0052
        }
    }
})

const geeta = new Bot({
    name: 'Geeta',
    main: {
        ws: config.main.ws,
        ft: config.main.contracts.ft,
        secret: config.main.bots.geeta
    },
    auction: {
        ws: config.auction.ws,
        auction: config.auction.contracts.auction,
        secret: config.auction.bots.geeta
    },
    tokens: {
        '0x131fc9e0314d16904ebc1b5005155b8fc90a093f': {
            name: 'Maker',
            symbol: 'MKR',
            decimal: 4,
            address: '0x131fc9e0314d16904ebc1b5005155b8fc90a093f',
            price: 1.6
        },
        '0x82ef3dbdee71bb9ccf98eec777180ffb58f0c8a7': {
            name: 'OmiseGO',
            symbol: 'OMG',
            decimal: 4,
            address: '0x82ef3dbdee71bb9ccf98eec777180ffb58f0c8a7',
            price: 0.008
        },
        '0xa17fafbab3a66262509c27bf4430bb4ec86af33a': {
            name: 'StatusNetwork',
            symbol: 'SNT',
            decimal: 4,
            address: '0xa17fafbab3a66262509c27bf4430bb4ec86af33a',
            price: 0.0003
        },
        '0xe403a838cfe077ba2cfd24c1d04a7e8648377f13': {
            name: 'Bancor',
            symbol: 'BNT',
            decimal: 4,
            address: '0xe403a838cfe077ba2cfd24c1d04a7e8648377f13',
            price: 0.002
        }
    }
})

seeta.run()
geeta.run()
