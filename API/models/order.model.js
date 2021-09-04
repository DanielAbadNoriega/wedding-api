const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    products: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
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

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;