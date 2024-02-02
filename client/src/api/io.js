import io from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:5000';

export const createSocket = (username) => {
    return io(SOCKET_SERVER_URL, { query: { username } });
};