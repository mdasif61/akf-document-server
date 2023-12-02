const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    member: [
        {
            name: { type: String },
            mobile: { type: Number },
            date: { type: String },
            share: { type: Number },
            ifound: { type: Number },
            fee: { type: Number },
            penalty: { type: Number },
            total: { type: Number },
            month: { type: String },
            account: { type: String },
            year: { type: String }
        }
    ],
    month: { type: String, required: true },
    account: { type: String},
    year: { type: String, required: true }
});


const PageData = mongoose.model('pageData', pageSchema);
module.exports = PageData