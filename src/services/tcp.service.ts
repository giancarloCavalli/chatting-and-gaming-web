import { Socket } from "net";

const net = require('net');

let socketData = ''

export const createConnection = (port: number, host: string): Socket => {
  const tcpSocket: Socket = net.createConnection(port, host)

  console.log("Conexão cliente TCP iniciada")
  
  tcpSocket
    .on('data', (data: Buffer) => {
      socketData = data.toString('utf-8')
      console.log('RESPONSE: ', socketData);
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

export const getMessage = async (tcpSocket: Socket, userId: number, password: string) => {
  console.log("Mensagens recebidas: \n")

  tcpSocket.write(`GET MESSAGE ${userId}:${password}`);
  await resolveAfterXMilliseconds(30);
  
  return socketData
}

export const getUsers = async (tcpSocket: Socket, userId: number, password: string) => {

  tcpSocket.write(`GET USERS ${userId}:${password}`);
  await resolveAfterXMilliseconds(30);
  
  return socketData
}

export const getPlayers = async (tcpSocket: Socket, userId: number, password: string) => {

  tcpSocket.write(`GET PLAYERS ${userId}:${password}`);
  await resolveAfterXMilliseconds(30);
  
  return socketData
}

export const sendMessage = (tcpSocket: Socket, userId: number, password: string, destinyId: number, message: string): void => {
  console.log(`SEND MESSAGE ${userId}:${password}:${destinyId}:${message}`)

  tcpSocket.write(`SEND MESSAGE ${userId}:${password}:${destinyId}:${message}`);
}

export const getCard = async (tcpSocket: Socket, userId: number, password: string) => {

  tcpSocket.write(`GET CARD ${userId}:${password}`);
  await resolveAfterXMilliseconds(30);
  
  return socketData
}

function resolveAfterXMilliseconds(x: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x)
    }, x);
  });
}