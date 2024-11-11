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
    },

    customerDetails: {
        sellinghistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
    },
    // Additional fields for dealer users
    dealerDetails: {
        phoneNumber: {
            type: String,
            // required: true,
        },
        serviceArea: {
            type: String,
            // required: true,
        },
        productsSold: [
            {
                product: String,
                date: Date,
                amount: Number
            }
        ]
    }
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;