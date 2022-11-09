require('dotenv').config()

import { IncomingMessage, ServerResponse, createServer } from "http";

import * as TCPSocketService from "./services/tcp.service";
import * as UDPSocketService from "./services/udp.service";

import * as MessageController from './controllers/message.controller'
import * as UserController from './controllers/user.controller'
import * as PlayerController from './controllers/player.controller'
import * as CardController from './controllers/card.controller'
import * as GameController from './controllers/game.controller'

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
  try{
    switch (request.url) {
      case '/messages':
        await MessageController.resolve(request, response, tcpSocket, udpSocket)
        break;
  
      case '/players':
        await PlayerController.resolve(request, response, tcpSocket)
  
        break;
  
      case '/users':
        await UserController.resolve(request, response, tcpSocket)
  
        break;
        
      case '/card':
        await CardController.resolve(request, response, tcpSocket)
        
        break;
        
      case '/game':
        await GameController.resolve(request, response, udpSocket)
          .catch(e => {
            "Passei aqui"
          }) 
        
        break;
    
      default:
        response.writeHead(400);
        response.end('Resource not found');
        break;
    }
  } catch(exception) {
    const error = {
      status: 400,
      message: (exception as Error).message
    }

    response.writeHead(error.status);
    response.end(JSON.stringify(error))
  }
  
};

const server = createServer(requestListener);

const internalHost = 'localhost';
const internalPort = 8000;
server.listen(internalPort, internalHost, () => {
    console.log(`Server is running on http://${internalHost}:${internalPort}`);
});
