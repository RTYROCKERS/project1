// const mongoose = require('mongoose');

// const mongo_url = process.env.MONGO_CONN;

// mongoose.connect(mongo_url)
//     .then(() => {
//         console.log('MongoDB Connected...');
//     }).catch((err) => {
//         console.log('MongoDB Connection Error: ', err);
//     })
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url, {
    serverSelectionTimeoutMS: 5000, // 10 seconds timeout
})
.then(() => {
    console.log('✅ MongoDB Connected...');
})
.catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
});
