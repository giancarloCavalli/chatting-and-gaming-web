import { Socket } from "net";

const net = require('net');

let message = ''

export const createConnection = (port: number, host: string): Socket => {
  const tcpSocket: Socket = net.createConnection(port, host)

  console.log("Conexão cliente TCP iniciada")
  
  tcpSocket
    .on('data', (data: Buffer) => {
      message = data.toString('utf-8')
      console.log('RESPONSE: ', message);
    })
    
    .on('connect', () => {
        console.log("I have connected")
      })

    .on('end', () => {
      console.log('TCP connection ended');
    })

    .on('error', (error: any) => {
        console.error(`Connection Error ${error}`); 
    });

    return tcpSocket
}

export const readMessage = async (tcpSocket: Socket, userId: number, password: string) => {
  console.log("Mensagens recebidas: \n")

  tcpSocket.write(`GET MESSAGE ${userId}:${password}`);
  await resolveAfterXMilliseconds(30);
  
  return message
}

export const sendMessage = (tcpSocket: Socket, userId: number, password: string, destinyId: number, message: string): void => {
  console.log(`SEND MESSAGE ${userId}:${password}:${destinyId}:${message}`)

  tcpSocket.write(`SEND MESSAGE ${userId}:${password}:${destinyId}:${message}`);
}

function resolveAfterXMilliseconds(x: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, x);
  });
}