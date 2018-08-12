const Bot = require('./bot')

const first = new Bot({
    main: {
        ws: 'wss://ropsten.infura.io/ws',
        secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'
    },
    auction: {
        ws: 'wss://ropsten.infura.io/ws',
        secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
        auction: {
            abi: 'simple_a.json',
            address: '0xbb6dbb073d6aa48166bf374980c2239ddb4446a3'
        }
    },
    tokens: {
        '0x6e8c1223e027de8e9a7f9b910ad6190458a1ce5e': {
            name: 'Maker',
            symbol: 'MKR',
            decimal: 4,
            address: '0x6e8c1223e027de8e9a7f9b910ad6190458a1ce5e',
            price: 1.46
        },
        '0x4133bc0d26756ca12eb06d2dc7cfbdac2d9595fb': {
            name: 'OmiseGO',
            symbol: 'OMG',
            decimal: 4,
            address: '0x4133bc0d26756ca12eb06d2dc7cfbdac2d9595fb',
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
first.run()
