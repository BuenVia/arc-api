const mongoose = require('mongoose')

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

module.exports = mongoose.model('Webinar', webinarSchema)