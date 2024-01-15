import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:5000';
console.log('SOCKET_SERVER_URL',SOCKET_SERVER_URL)
export const socket = io(SOCKET_SERVER_URL);
