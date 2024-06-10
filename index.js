// create server instance
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// other modules
const configFile = require('./config.json'); // config file
//const utils = require('./utils.js'); // own utilities
const path = require('path'); // manage local paths
const fs = require('fs')

// WEB SERVER
// static files
const pagesStatics = 'pages';
app.use('/', express.static(path.join(__dirname, pagesStatics, 'home')));
//app.use('/notFound',    express.static(path.join(__dirname, pagesStatics, 'notFound')));
app.use(express.static(path.join(__dirname, pagesStatics, 'statics')));

// every other request (e.g. /test /lol /get/database)
app.all('*', (req, res) => {
    //res.redirect('/notFound');
    res.status(404).send("404 not found")
});


// SOCKET
io.on('connect', (socket) => {

    console.log(socket.id, 'just connected to the server');

    socket.on('test', (data) => {
        console.log(socket.id, data);
        socket.emit('testBack', (data));
    });

    socket.on('disconnecting', () => {
		console.log(socket.id, 'just disconnected from the server');
	});
});

server.listen(configFile.webServer.port, configFile.webServer.host, () => {
    console.log(`webServer listening ${configFile.webServer.host}:${configFile.webServer.port}`);
});