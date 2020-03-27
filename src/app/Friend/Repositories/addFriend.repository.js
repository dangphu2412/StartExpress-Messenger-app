import query from '../../../infrastructure/Repositories/BaseRepository';

function getRelation(id, email) {
    return query.getBy('friends', {
        senderId: id,
        receiverEmail: email,
    }, ('status'));
}

export default {
    getRelation,
};
