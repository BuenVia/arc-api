const express = require('express')
const router = express.Router()

const Download = require('../models/downloadSchema')

router.route('/api/downloads')
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

module.exports = router