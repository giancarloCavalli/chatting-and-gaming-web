import { IncomingMessage, ServerResponse, createServer } from "http";

import * as SocketService from "./services/socket.service";
import * as MessageController from './controllers/message.controller'

const port = 1012;
const host = 'larc.inf.furb.br'
const socket = SocketService.createConnection(port, host)

const requestListener = async function (request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case '/messages':
      await MessageController.resolve(request, response, socket)
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
