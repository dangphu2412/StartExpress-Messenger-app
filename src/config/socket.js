import socketIo from 'socket.io';

import Conversation from '../app/Conversation/Services/ConversationService';

function socketConfig(server) {
    const io = socketIo(server);
    Conversation.io = io.of('conversations');
    Conversation.io.on('connection', (socket) => {
        socket.on('joinRoom', (room) => {
            console.log('=========> joined');
            socket.join(room);
        });
        socket.on('leaveThenJoinRoom', (oldRoom, room) => {
            console.log(`leave ========>${oldRoom}========> join ${room}`);            
            socket.leave(oldRoom);
            socket.join(room);
        });
    });
}

export default socketConfig;
