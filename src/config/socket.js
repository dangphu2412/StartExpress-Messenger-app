import socketIo from 'socket.io';
import Conversation from '../app/Conversation/Services/ConversationService';


function socketConfig(server) {
    const io = socketIo(server);
    Conversation.io = io.of('/conversations');
    Conversation.io.on('connection', (socket) => {
        socket.on('join', (data) => {
            console.log(data);
        });
        socket.on('messages', (msg) => {
            socket.broadcast.emit('sendMess', msg);
        });
        socket.on('friendReq', (data) => {
            console.log(data);
            socket.broadcast.emit('sendFriendReq', data);
        });
    });
}

export default socketConfig;
