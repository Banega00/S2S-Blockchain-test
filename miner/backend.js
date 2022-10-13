const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser') 
const express = require('express');
const cors = require('cors');
const app = express();

const server = require('http').Server(app)

const io = require('socket.io')(server, {
    cors:{
        origin: "*",
        methods: ["GET","POST"]
    }
})

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

const PORT = process.env.PORT ?? 3001;

server.listen(PORT, function(){
    console.log(`Server is up, listening on port ${PORT}`)
})



