import { IncomingMessage, ServerResponse } from "http";
import { Socket as DgramSocket  } from "dgram";

import { Headers } from "../types/headers";

import * as UDPSocketService from "../services/udp.service";
import { GameCommandBody } from "../types/game-command";

export const resolve = async (request: IncomingMessage, response: ServerResponse, udpSocket: DgramSocket) => {
  const { userid, password } = request.headers as Headers

  if (!userid || !password) {
    response.writeHead(400);
    response.end('Necessário informar as credenciais "userid" e "password" no header da requisição');
    return
  }

  switch (request.method) {
    case 'POST': {
      let body = '';
      request.on('data', (chunk) => {
          body += chunk;
      });

      request.on('end', () => {
          const { command }: GameCommandBody = JSON.parse(body)

          UDPSocketService.sendGameCommand(udpSocket, userid, password, command)

          response.writeHead(201); 
          response.end('Created'); 
      });

      break;
    }
  
    default:
      break;
  }
}