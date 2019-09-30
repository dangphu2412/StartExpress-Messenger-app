import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';

class FriendRepository extends BaseRepository {
    static repository;

    static getRepository() {
        if (!this.repository) {
            this.repository = new this();
        }
        return this.repository;
    }

    getTableName() {
        return 'friends';
    }

    checkFriend(user, data) {
        return this.getByAnother(
        {
            userId: user.id,
            friendId: data.friendId,
        },
        {
            userId: data.friendId,
            friendId: user.id,
        });
    }

    createFriendReq(user, data) {
        return this.create({
            userId: user.id,
            friendId: data.friendId,
            received: data.friendId,
            status: '0',
        });
    }

    createFriendRes(user, data) {
        return this.create({
            userId: data.friendId,
            friendId: user.id,
            received: data.friendId,
            status: '0',
        });
    }

    friendList(user) {
        return this.listBy({
            friendId: user.id,
            received: user.id,
        });
    }

    acceptFriendReq(user, data) {
        return this.update({
            userId: data.friendId,
            received: user.id,
        },
        {
            status: '1',
        });
    }

    acceptFriendRes(user, data) {
        return this.update({
            received: user.id,
            friendId: data.friendId,
        }, {
            status: '1',
        });
    }
}

export default FriendRepository;
