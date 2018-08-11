module.exports = {
    nets: {
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
