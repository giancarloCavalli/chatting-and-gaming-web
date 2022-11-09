require('dotenv').config()

import { Socket } from "dgram";
import { AddressInfo } from "net";

const udpSocket = require('dgram')

var data = Buffer.from('siddheshrane');

var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');

export const createSocket = (): Socket => {
  const client = udpSocket.createSocket('udp4');

  client.on('message', function(message: Buffer, remoteAddressInfo: AddressInfo){
    console.log('Data received from server : ' + message.toString());
    console.log('Received %d bytes from %s:%d\n',message.length, remoteAddressInfo.address, remoteAddressInfo.port);
  });

  console.log("Conexão cliente UDP iniciada")

  return client
}

export const sendMessage = (clientSocket: Socket, userId: string, password: string, destinyId: string, message: string): void => {
  const UDP_PORT: number = Number(process.env.UDP_PORT);
  const UDP_HOST: string | undefined = process.env.UDP_HOST

  if (UDP_PORT === 0 || !UDP_HOST) {
    throw 'Necessário configurar porta e host UDP'
  }

  const request = `SEND MESSAGE ${userId}:${password}:${destinyId}:${message}`

  clientSocket.send(request, UDP_PORT, UDP_HOST, (error: Error | null) => {
    if(error){
      clientSocket.close();
    }else{
      console.log(`'${request}' sent!`);
    }
  });

} 