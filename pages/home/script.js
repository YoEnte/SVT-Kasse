var socket = io();

function domOnload() {
    console.log('loaded DOM');
}

function sendTest(data) {
    socket.emit('test', ( {msg: data} ));
}

socket.on('testBack', (data) => {
    console.log(data);
});