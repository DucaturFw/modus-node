module.exports = {
    main: {
        ws: 'wss://ropsten.infura.io/ws',
        factory: {
            abi: 'eth_flat.json',
            address: '0x7371ea969af4bc5b8ac03cbd3dcbb654003a8ffe'
        },
        etf: {
            abi: 'etf.json'
        }
    },
    auction: {
        net: {
            port: 4267,
            hostname: '0.0.0.0',
            db_path: '../gn_auct',
            accounts: [
                {
                    secretKey: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
                    balance: '10000000000000000000000'
                }
            ]
        }
    },

    nets: {
        main: {
            ws: 'wss://ropsten.infura.io/ws'
        },

        /*
        main: {
            port: 3416,
            hostname: '0.0.0.0',
            db_path: '../gn_main',
            accounts: [
                {
                    secretKey: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
                    balance: '10000000000000000000000'
                }
            ]
        },
        */
        auction: {
            port: 4267,
            hostname: '0.0.0.0',
            db_path: '../gn_auct',
            accounts: [
                {
                    secretKey: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
                    balance: '10000000000000000000000'
                }
            ]
        }
    }
}
