const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./rating.model.js');
require('./comment.model.js');

const productSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    category: {
        type: String,
        enum: ['events', 'presents', 'photocall'],
        required: true
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    images: {
        type: [String],
        required: 'Image is required'
    },
     //rating: Rating, lo mismo que orders, populando y trayendome 
    //todas las rating donde su campo prudct sea igual al id del producto que estoy pidiendo
    //comments: Comment 
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

productSchema.virtual('rating', {
    ref: 'Rating',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
})

productSchema.virtual('comments', {
    ref: 'Comments',
    localField: '_id',
    foreignField: 'product',
    justOne: false,
})


const Product = mongoose.model('Product', productSchema);
module.exports = Product;