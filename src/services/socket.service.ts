import { Socket } from "net";

const net = require('net');

let message = ''

export const createConnection = (port: number, host: string) => {
  const socket: Socket = net.createConnection(port, host)

  console.log('Socket created.');
  
  socket
  .on('data', (data: Buffer) => {
    message = data.toString('utf-8')
    console.log('RESPONSE: ', message);
  })
  .on('connect', () => {
    // socket.write("GET / HTTP/1.0\r\n\r\n");
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

    return socket
}

export const readMessage = async (socket: Socket, userId: number, password: string) => {
  console.log("Mensagens recebidas: \n")

  socket.write(`GET MESSAGE ${userId}:${password}`);
  await resolveAfterXMilliseconds(30);
  
  return message
}

export const sendMessage = (socket: Socket, userId: number, password: string, destinyId: number, message: string): void => {
  console.log(`SEND MESSAGE ${userId}:${password}:${destinyId}:${message}`)

  socket.write(`SEND MESSAGE ${userId}:${password}:${destinyId}:${message}`);
}

function resolveAfterXMilliseconds(x: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, x);
  });
}