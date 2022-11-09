import { IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";

import { Headers } from "../types/headers";
import { Message } from "../types/message";

import * as SocketService from "../services/tcp.service";

export const resolve = async (request: IncomingMessage, response: ServerResponse, socket: Socket) => {
  const { userid, password } = request.headers as Headers

  if (!userid || !password) {
    response.writeHead(400);
    response.end('Necessário informar as credenciais "userid" e "password" no header da requisição');
    return
  }

  switch (request.method) {
    case 'GET': {
      const message = await SocketService.readMessage(socket, Number(userid), password)

      response.writeHead(200);
      response.end(`Received message: ${message}`);
      break;
    }

    case 'POST': {
      let body = '';
      request.on('data', (chunk) => {
          body += chunk;
      });

      request.on('end', () => {
          const { destinyId, message }: Message = JSON.parse(body)

          SocketService.sendMessage(socket, Number(userid), password, Number(destinyId), message)

          response.writeHead(201); 
          response.end('Created'); 
      });

      break;
    }
  
    default:
      break;
  }
}