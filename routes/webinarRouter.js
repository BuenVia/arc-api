const express = require('express')
const router = express.Router()

const Webinar = require('../models/webinarSchema')

router.route('/api/webinar')
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

router.route('/api/webinar/update')
.put(async (req, res) => {
    try {
        const webinar = await Webinar.updateOne({ _id: req.body._id }, { $set: req.body })
        res.send(req.body)
    } catch (err) {
        res.send(err)    
    }
})

module.exports = router