const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const fs = require('fs')
const app = express();

const server = require('http').Server(app)

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));


app.get('/miner-data', async (request, response) => {
    try {
        const filePath = `./public/miner-data${PORT}.json`;
        // console.log(filePath)
        const data = JSON.parse(fs.readFileSync(filePath).toString());

        response.status(200).json(data);

    } catch (error) {

        console.log(error)

        response.status(500).json();
    }
})

app.post('/save-miner-data', async (request, response) => {
    const minerData = request.body;
    try {
        const filePath = `./public/miner-data${PORT}.json`;
        // console.log(filePath)
        fs.writeFileSync(filePath, JSON.stringify(minerData));

        response.status(200).json();

    } catch (error) {

        console.log(error)

        response.status(500).json();
    }


})

const PORT = process.env.PORT ?? 3001;

server.listen(PORT, function () {
    console.log(`Server is up, listening on port ${PORT}`)
})



