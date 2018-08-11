const express = require('express')
const app = express()

const morgan = require('morgan')
app.use(morgan('tiny'))

const EMOJIS = ['🤓', '🤑', '👨‍💻', '✌️', '🖕']

app.get('/ping', (req, res) => {
    const emoji = EMOJIS[Math.floor(Math.random() * Math.floor(EMOJIS.length))]
    res.send(emoji)
})

app.listen('4268', () => {
    console.log('Listening')
})
