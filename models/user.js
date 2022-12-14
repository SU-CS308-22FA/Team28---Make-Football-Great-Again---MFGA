const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    role:{
        type: Number,
    },
    status:{
        type:Number,
    },
    team:{
        type:String,
    },
    points: {
        type:Number,
        default: 0
    }, 
    awards:{
        type:[],
        default:[]
    }
    
})
mongoose.model('User', userSchema);