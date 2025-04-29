const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const CustomerRouter = require('./Routes/CustomerRouter'); 
const DealerRouter = require('./Routes/DealerRouter');   
const {googleLogin}=require('./Controllers/AuthController');  
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // allow frontend
    methods: ["GET", "POST"]
  }
});

app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.get('google-login',googleLogin);
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/customer', CustomerRouter);  // Customer routes
app.use('/dealer', DealerRouter);      // Dealer routes

io.on("connection", (socket) => {
    try {
      console.log("✅ A user connected:", socket.id);
  
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
  
    } catch (err) {
      console.error("❌ Error in socket connection:", err);
    }
  });
io.on("connection_error", (err) => {
    console.error("❌ [Server] Socket.IO connection error:", err);
  });
app.set("io", io);
server.listen(PORT, () => {
    //console.log(process.env.CLIENT_ID);
    console.log(`Server is running on ${PORT}`)
});