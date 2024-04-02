const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
}, {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;