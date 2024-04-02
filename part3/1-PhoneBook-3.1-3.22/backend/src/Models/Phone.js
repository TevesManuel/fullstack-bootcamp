const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
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