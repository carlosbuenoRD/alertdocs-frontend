import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:80";
let kanbaSocket: Socket;

kanbaSocket = io(ENDPOINT);

export default kanbaSocket;
