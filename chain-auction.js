const Ganache = require('ganache-core')

const options = {
    port: 9876,
    hostname: '127.0.0.1',
    total_accounts: 2
}

const server = Ganache.server(options)
server.listen(options.port, options.hostname, (err, bc) => {
    if (err) {
        return console.error(err)
    }

    console.log(bc)
})
