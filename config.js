module.exports = {
    main: {
        ws: 'wss://ropsten.infura.io/ws',
        contracts: {
            ft: {
                abi: 'ft.json',
                address: '0xaba6181f8baad9d65bfcadadf3a237c2aa73cac6'
            }
        },
        ganache: {
            port: 3416,
            hostname: '0.0.0.0',
            db_path: '../../gn_main',
            accounts: [
                {
                    secretKey: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
                    balance: '100000000000000000000000'
                },

                // Bots
                {
                    secretKey: '0xa69343cfe238406702b6e4cb6ebb35e92c08fb1e4ea42bda4ba1700803966c6d',
                    balance: '100000000000000000000000'
                },
                {
                    secretKey: '0x9ffd3c522699f25cc096095ae45cfdeae8bfb81c43335b0edf4fff4f4963fc65',
                    balance: '100000000000000000000000'
                },

                // Client
                {
                    secretKey: '0xded33c17cb3bf81ad03f9404b8159d38f0a8dda2315f506dd5f2396d38164462',
                    balance: '100000000000000000000000'
                },   
            ]
        },
        relay: {
            secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'
        }
    },
    auction: {
        ws: 'wss://ropsten.infura.io/ws',
        contracts: {
            auction: {
                abi: 'flat_a.json',
                address: '0x5facbc982591f2382b3a0b874c88fd26ab14e12e'
            }
        },
        ganache: {
            port: 4267,
            hostname: '0.0.0.0',
            db_path: '../../gn_auct',
            accounts: [
                {
                    secretKey: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f',
                    balance: '100000000000000000000000'
                },

                // Bots
                {
                    secretKey: '0xa69343cfe238406702b6e4cb6ebb35e92c08fb1e4ea42bda4ba1700803966c6d',
                    balance: '100000000000000000000000'
                },
                {
                    secretKey: '0x9ffd3c522699f25cc096095ae45cfdeae8bfb81c43335b0edf4fff4f4963fc65',
                    balance: '100000000000000000000000'
                },
            ]
        },
        relay: {
            secret: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f'
        }
    }
}
