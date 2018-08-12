const RIPEMD160 = require('ripemd160')
const crypto = require('crypto')



let d = new RIPEMD160().update(new Buffer('2c1cc984b8be56ffcad6f00bfa07c5fa048f0fe087d46b87107ab950e3b92ff4', 'hex')).digest()

console.log(d)

//ecret:    
//Hashed Secret:   521a755db7126c28f6a04704ab97676619564f13
