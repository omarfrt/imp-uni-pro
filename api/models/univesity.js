const mongoose = require ('mongoose');
const uniSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uniname:{
        type: String,
         required: true
    },
    uniwebsite:{
        type: String,
        required:true
    },
    uniphone:{
        type: String,
        required: true
    },
    uniaddress:{
        type :String,
        required: true
    },
    uniabout:{
        type: String,
        required: true
    },
    uniimg:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Uni',uniSchema );