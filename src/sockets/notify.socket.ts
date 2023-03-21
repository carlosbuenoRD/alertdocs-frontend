import { io, Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:81";
let notifySocket: Socket;

notifySocket = io(ENDPOINT);

export default notifySocket;
