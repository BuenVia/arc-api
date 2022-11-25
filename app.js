const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
let port = 9000

mongoose.connect(process.env.MONGO_DB).then(console.log('Connected to ARC DB')).catch(err => console.error(err))

const downloadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Download = mongoose.model('Download', downloadSchema)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.route('/api/resource')
.get(async (req, res) => {
    const download = await Download.find()
    try {
        res.send(download)
    } catch (err) {
        console.error(err)
    }
})
.post(async (req, res) => {
    const newDownload = new Download({
        name: req.body.fullName,
        email: req.body.email
    })
    const saveDownload = await newDownload.save()
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})