require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');

const connectMongoDB = require('./connection');
const router = require('./routes');

// Socket Io
const server = http.createServer(app);
const io = new Server(server, {
    cors: "*"
});

io.on('connection', (socket) => {
    
    socket.on('join', (data) => {
        socket.join(data.userId)
    })

    socket.on('message', (data) => {
        io.to(data.reciverId).emit('messageResponse', data);
        io.to(data.reciverId).emit('readResponse', data);
    });

    socket.on('disconnect', () => {
        console.log("disconnect", socket.id);
    })
})

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', router);

// connection
const URI = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT;
connectMongoDB(URI)
    .then(() => {
        console.log('Database connected successfully!');
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch((err) => console.error("Coudn't connect database", err));
