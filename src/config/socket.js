import socketIo from 'socket.io';
// import Conversation from '../app/Conversation/Services/ConversationService';
import FriendService from '../app/Friend/Services/FriendService';

function socketConfig(server) {
    const io = socketIo(server);
    FriendService.io = io.of('conversations');
    FriendService.io.on('connection', (socket) => {
        socket.on('join', (say) => {
          console.log(say);
        });
        socket.on('messages', (msg) => {
            socket.broadcast.emit('sendMess', msg);
        });
    });
}

export default socketConfig;
