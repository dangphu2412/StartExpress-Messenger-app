import socketIo from 'socket.io';

import Conversation from '../app/Conversation/Services/ConversationService';

function socketConfig(server) {
    const io = socketIo(server);
    Conversation.io = io.of('conversations');
    Conversation.io.on('connection', (socket) => {
        socket.on('joinRoom', (room) => {
            socket.join(room);
        });
        socket.on('messSent', (data) => {
            socket.broadcast.to(data.idChat).emit('messReceived', data.mess);
        });
        socket.on('latestMess', (data) => {
            socket.broadcast.emit('updateLatestGroup', data);
        });
    });
}

export default socketConfig;
