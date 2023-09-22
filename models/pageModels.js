const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    member: [
        {
            name: { type: String },
            mobile: { type: String },
            date: { type: String },
            share: { type: String },
            ifound: { type: String },
            fee: { type: String },
            penalty: { type: String },
            total: { type: String },
            month: { type: String },
            account: { type: String },
            year: { type: String }
        }
    ],
    month: { type: String, required: true },
    account: { type: String, required: true },
    year: { type: String, required: true }
});

const PageData = mongoose.model('pageData', pageSchema);
module.exports = PageData