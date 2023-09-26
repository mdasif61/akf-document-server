const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: {
        type: { String },
        default: 'https://i.ibb.co/MfZLVyd/akf-logo.jpg'
    },

},
    { timestamps: true }
);

const User = mongoose.model('users', userSchema);
module.exports = User;