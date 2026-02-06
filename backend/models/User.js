const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['writer', 'reader', 'admin'],
        default: 'reader'
    }
}, {timestamps: true});

module.exports= mongoose.model('User', userSchema);