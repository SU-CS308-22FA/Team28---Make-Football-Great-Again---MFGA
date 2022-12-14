const mongoose = require('mongoose')

const awardsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    pointsNeeded: {
        type: Number, 
        required: true
    },
    winner: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        default: 1
    },
    applied:{
        type: [],
        default: []
    }
}, {timestamps: true})
mongoose.model('Awards', awardsSchema);