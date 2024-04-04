const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: v => {
                return /\d{3}-\d{7}/.test(v) || /\d{2}-\d{7}/.test(v);
            },
            message: 'Error the number is invalid.'
        }
    },
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