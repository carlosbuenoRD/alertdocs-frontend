import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:1080";
let kanbaSocket: Socket;

kanbaSocket = io(ENDPOINT);

export default kanbaSocket;
