import { IncomingMessage, ServerResponse, createServer } from "http";

require('dotenv').config()

import * as TCPSocketService from "./services/tcp.service";
import * as UDPSocketService from "./services/udp.service";
import * as MessageController from './controllers/message.controller'

const TCP_PORT = Number(process.env.TCP_PORT)

if (TCP_PORT === 0) {
  throw 'Necessário configurar uma porta TCP para iniciar o sistema'
}

const TCP_HOST: string | undefined = process.env.TCP_HOST

if (!TCP_HOST) {
  throw 'Necessário configurar um host TCP para iniciar o sistema'
}

const tcpSocket = TCPSocketService.createConnection(TCP_PORT, TCP_HOST)

const udpSocket = UDPSocketService.createSocket()

const requestListener = async function (request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case '/messages':
      await MessageController.resolve(request, response, tcpSocket)
      break;

    case '/players':

      break;

    case '/users':

      break;

    case '/cards':
      
      break;
  
    default:
      response.writeHead(400);
      response.end('Resource not found');
      break;
  }
  
};

const server = createServer(requestListener);

const internalHost = 'localhost';
const internalPort = 8000;
server.listen(internalPort, internalHost, () => {
    console.log(`Server is running on http://${internalHost}:${internalPort}`);
});
