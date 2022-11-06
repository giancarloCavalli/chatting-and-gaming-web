"use strict";
var net = require('net');
var port = 1012;
var host = 'larc.inf.furb.br';
var socket = net.createConnection(port, host);
// socket.setEncoding('UTF8') 
console.log('Socket created.');
socket
    .on('data', function (data) {
    // Log the response from the HTTP server.
    console.log('RESPONSE: ', data.toString('utf-8'));
})
    .on('connect', function () {
    // socket.write("GET / HTTP/1.0\r\n\r\n");
    setInterval(readMessage, 3000, 2080, 'mlvrx');
    console.log("I have connected");
    // socket.write("GET USERS 3264:cvdhl");
    // socket.write("SEND MESSAGE 3264:cvdhl:2080:Alooo");
})
    .on('end', function () {
    console.log('DONE');
})
    .on('error', function (error) {
    console.error("Connection Error ".concat(error));
});
function readMessage(userId, password) {
    console.log("Mensagens recebidas: \n");
    socket.write("GET MESSAGE ".concat(userId, ":").concat(password));
}
