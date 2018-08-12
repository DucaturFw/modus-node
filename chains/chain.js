const Ganache = require('ganache-core')
const BN = require("bn.js")

class Chain {
    constructor(options) {
        const server = Ganache.server(options)
        server.listen(options.port, options.hostname, (err, bc) => {
            if (err) {
                return console.error(err)
            }

            const state = bc ? bc : server.provider.manager.state

            for (let account of Object.values(state.accounts)) {
                const balance = new BN(account.account.balance).divRound(new BN("1000000000000000000")).toString()
                console.log(`${account.address}: ~ ${balance} ETH`)
            }

            console.log(`Listen on ${options.hostname}:${options.port}`)
        })
    }
}

module.exports = Chain
