import { IncomingMessage, ServerResponse } from "http";
import { Socket as TCPSocket } from "net";

import * as TCPSocketService from "../services/tcp.service";
import { Headers } from "../types/headers";

export const resolve = async (request: IncomingMessage, response: ServerResponse, tcpSocket: TCPSocket) => {
  const { userid, password } = request.headers as Headers

  if (!userid || !password) {
    response.writeHead(400);
    response.end('Necessário informar as credenciais "userid" e "password" no header da requisição');
    return
  }

  switch (request.method) {
    case 'GET': {
      const user = await TCPSocketService.getUsers(tcpSocket, Number(userid), password)

      response.writeHead(200);
      response.end(`Retrieved user: ${user}`);
      break;
    }
  
    default:
      break;
  }

}