const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const CustomerRouter = require('./Routes/CustomerRouter'); 
const DealerRouter = require('./Routes/DealerRouter');     

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/customer', CustomerRouter);  // Customer routes
app.use('/dealer', DealerRouter);      // Dealer routes

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});