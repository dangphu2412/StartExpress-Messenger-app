import query from '../../../infrastructure/Repositories/BaseRepository';
// Status = 0 : DENY
// Status = 1 : Pending
// Status = 2 : Accepted

function getFriendIdByEmail(receiverEmail) {
    return query.getBy('users', {
        email: receiverEmail,
    }, 'id');
}

function getRelation(senderId, receiverId) {
    return query.getBy('friends', {
        userId: senderId,
        receiverId,
    }, 'status');
}

function createRequest(userId, friendId, message) {
    return query.create('friends', {
        userId,
        friendId,
        receiverId: userId,
        message,
        status: 1,
    });
}

function createResponse(userId, friendId, message) {
    return query.create('friends', {
        userId,
        friendId,
        receiverId: friendId,
        message,
        status: 1,
    });
}

export default {
    getRelation,
    getFriendIdByEmail,
    createRequest,
    createResponse,
};
