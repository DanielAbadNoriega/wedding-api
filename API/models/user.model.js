const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');
require('./order.model.js');
require('./product.model.js');

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    phone: {
        type: Number,
        required: 'Phone is required',
        minlength: [9, 'Phone is not valid']
    },
    email: {
        type: String,
        match: [EMAIL_PATTERN, 'Email is not valid'],
        lowercase: true,
        unique: true,
        trim: true,
        required: 'Email is required'
    },
    avatar: {
        type: String,
        default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    },
    address: {
        type: String
    },
    wishlist: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },
    password: {
        type: String,
        required: 'A valid password is required',
        match: [PASSWORD_PATTERN, 'the password is invalid']
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

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;