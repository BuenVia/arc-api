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

const webinarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    show: {
        type: Boolean,
        default: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

const Webinar = mongoose.model('Webinar', webinarSchema)

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

// Webinar
app.route('/api/webinar')
.get(async (req, res) => {
    try {
        const webinar = await Webinar.find()
        res.send(webinar)
    } catch (err) {
        console.error(err)
    }
})
.post(async (req, res) => {
    const newWebinar = new Webinar({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        link: req.body.link,
    })
    const saveWebinar = await newWebinar.save()
    res.send(`Success:\n${newWebinar}`)
})

app.route('/api/webinar/update')
.put(async (req, res) => {
    try {
        const webinar = await Webinar.updateOne({ _id: req.body._id }, { $set: req.body })
        res.send(req.body)
    } catch (err) {
        res.send(err)    
    }
})

app.listen(port, () => {
    console.log(`App running on port: ${port}`)
})