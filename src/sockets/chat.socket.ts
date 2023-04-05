import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:1082";
let chatSocket: Socket;

chatSocket = io(ENDPOINT);

export default chatSocket;
