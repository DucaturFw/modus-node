const Bot = require('./bot')
const bot = new Bot({
    main: {
        ws: 'wss://ropsten.infura.io/ws',
        secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'
    },
    auction: {
        ws: 'wss://ropsten.infura.io/ws',
        secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
        auction: {
            abi: '',
            address: ''
        }
    },
    tokens: {
        'VTC': {
            token: 'VTC',
            address: '0x52d910bfcac51982b884b90891445fa16d5af3d9',
            price: 0.5
        }
    }
})
bot.run()

bot.bingo()