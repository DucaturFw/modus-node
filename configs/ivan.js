module.exports = {
    main: {
        ws: 'ws://172.16.30.127:4267',
        contracts: {
            ft: {
                abi: 'ft.json',
                address: '0x52d6b639e646801f2dbe502870bf06435df7b6e0'
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
            secret: '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533'
        },
        bots: {
            seeta: '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533',
            geeta: '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533'
        }
    },
    auction: {
        //ws: 'wss://ropsten.infura.io/ws',
        ws: 'ws://172.16.30.127:4267',
        contracts: {
            auction: {
                abi: 'flat_a.json',
                address: '0xb7140a87b2144732d9bd1d159c5c606f2b7e9ae2'
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
            secret: '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533'
        },
        bots: {
            seeta: '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533',
            geeta: '0x0aebd309b2960e6fd43df883f61635a801265c5c588dec4585ef5002c16d9533'
        }
    }
}
