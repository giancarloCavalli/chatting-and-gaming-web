import { IncomingMessage, ServerResponse } from "http";
import { createConnection, readMessage, sendMessage } from "./socket.service";

const http = require("http");

const internalHost = 'localhost';
const internalPort = 8000;

const socket = createConnection()

const requestListener = async function (req: IncomingMessage, res: ServerResponse) {

  if (req.url?.includes('messages')) {
    const message = await readMessage(socket, 3264, 'cvdhl')

    res.writeHead(200);
    res.end(`Received message: ${message}`);

  } else if (req.url?.includes('send')) {
    sendMessage(socket, 3264, 'cvdhl', 3264, 'E aee, belez?')

    res.writeHead(200);
    res.end("Message sent");
  } else {
    res.writeHead(200);
    res.end("Done nothing");
  }
  
};

const server = http.createServer(requestListener);
server.listen(internalPort, internalHost, () => {
    console.log(`Server is running on http://${internalHost}:${internalPort}`);
});
