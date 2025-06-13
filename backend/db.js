const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect('mongodb+srv://hiteshgarg369:yKUAnd8K1WAMlv6u@cluster0.zn2ji.mongodb.net/paytm_project')
        console.log("Connected to mongoDB");
    } catch (err){
        console.error("FAILED TO connect to MongoDb" , err);
        process.exit(1);
    }
}


const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 50
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        unique: true,
        lowercase: true,
        minLength: 3
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
});

const accountSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required:  true
    }
});

const User = mongoose.model('User' , userSchema);
const Account = mongoose.model('Account', accountSchema)
module.exports = {
    User , Account , connectDB
};
