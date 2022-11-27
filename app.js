const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
let port = 9000

mongoose.connect(process.env.MONGO_DB).then(console.log('Connected to ARC DB')).catch(err => console.error(err))

const downloadSchema = require('./routes/downloadRouter')
const webinarRouter = require('./routes/webinarRouter')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header({
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
    });
    next();
  });

// Index
app.get('/', (req, res) => {
    res.send('ARC Support Services API')
})

// Resource downloads
app.route('/api/downloads')
.get(downloadSchema)
.post(downloadSchema)

// Webinar
app.route('/api/webinar')
.get(webinarRouter)
.post(webinarRouter)
app.route('/api/webinar/update')
.put(webinarRouter)

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})