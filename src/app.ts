const net = require('net');

const port = 1012;
const host = 'larc.inf.furb.br'

const socket = net.createConnection(port, host)
// socket.setEncoding('UTF8') 

console.log('Socket created.');

socket
.on('data', (data: Buffer) => {
  // Log the response from the HTTP server.
  console.log('RESPONSE: ', data.toString('utf-8'));
})
.on('connect', () => {
  // socket.write("GET / HTTP/1.0\r\n\r\n");
    setInterval(readMessage, 3000, 2080, 'mlvrx')
    console.log("I have connected")
    // socket.write("GET USERS 3264:cvdhl");
    // socket.write("SEND MESSAGE 3264:cvdhl:2080:Alooo");
  })
  .on('end', () => {
    console.log('DONE');
  })
  .on('error', (error: any) => {
     console.error(`Connection Error ${error}`); 
  });

function readMessage(userId: number, password: string): void {
  console.log("Mensagens recebidas: \n")
  socket.write(`GET MESSAGE ${userId}:${password}`);
}