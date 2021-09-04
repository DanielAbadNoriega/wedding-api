const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema ({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rate: {
        type: Number,
        required: 'Rating is required'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;