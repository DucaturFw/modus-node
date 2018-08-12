const BN = require("bn.js")
const Web3 = require('web3')
const Big = require('big.js')


let x = new Big(48.0769)

console.log(x.toString())

let d = (new Big('10')).pow(4)
console.log(d.toFixed())

let y = new Big('100000000000000000000000')

let z = x.times(y)

console.log(z.toFixed())