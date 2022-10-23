const express = require('express');
const app = express();

const mongoose = require('mongoose');
require("dotenv").config();
const userRoutes = require("./src/routes/user");

const port = process.env.PORT || 9000;

const http = require('http');
const server =http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) =>{
   // socket.on('chat', (msg) => {
    //    console.log('mensaje', msg);
    //} )

    socket.on('chat', (msg) => {
        io.emit('chat', msg);
    })
})

//middleware
app.use('/api', userRoutes);
app.use(express.json());

//routes
app.get('/', (req, res) => {
    //res.send('<h1>chat app</h1>');
    //console.log(__dirname);
    res.sendFile(`${__dirname}/cliente/index.html`);
});

//mongodb connection ((GIVE ME AN ERROR))
mongoose.connect(process.env.MONGODB_URI)
       .then( () => console.log("connected to MongoDB Atlas"))
        .catch((error) => console.error(error));


server.listen(port, ()=> {
    console.log('Servidor corriendo en puerto', port);
});
