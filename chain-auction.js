const Ganache = require('ganache-core')
const BN = require("bn.js")

const options = {
    port: 4267,
    hostname: '127.0.0.1',
    db_path: '../gn_auct',
    accounts: [
        {
            secretKey: '0xebed62445f346abe7f51bd1a80be9788007570a83e9c43a5a45cb49c33b9a85f', 
            balance: '10000000000000000000000'
        }
    ]
}

const server = Ganache.server(options)
server.listen(options.port, options.hostname, (err, bc) => {
    if (err) {
        return console.error(err)
    }

    const state = bc ? bc : server.provider.manager.state

    for (account of Object.values(state.accounts)) {
        const balance = new BN(account.account.balance).divRound(new BN("1000000000000000000")).toString()
        console.log(`${account.address}: ~ ${balance} ETH`)
    }

    console.log(`Listen on ${options.hostname}:${options.port}`)
})
