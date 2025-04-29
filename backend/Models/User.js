const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Schema
const UserSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['customer', 'dealer', 'admin'],
        required: true
    },
    dealerDetails: {
        phoneNumber: {
            type: String,
        },
        serviceArea: {
            type: String,
        },
        productsSold: [
            {
                product: String,
                date: Date,
                amount: Number
            }
        ]
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    // Additional fields for customer users
    customerDetails: {
        purchaseHistory: [
            {
                product: String,
                date: Date,
                amount: Number
            }
        ]
        ,
        sellinghistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
    },
    google: {
        type: String
    },
    profileCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;