const express  = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./route/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            userNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
            })
            app.listen(PORT, () => console.log(`App has been started on ${PORT}...`))
    }catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
