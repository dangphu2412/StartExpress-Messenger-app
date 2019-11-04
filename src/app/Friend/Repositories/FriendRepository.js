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

    queryFrJustSent(user, data) {
        return this.joinListBy('users', 'users.id', 'friends.userId',
        {
            userId: user.id,
            friendId: data.friendId,
            status: '0',
        });
    }

    acceptFriendReq(user, data) {
        return this.update({
            userId: data.friendId,
            friendId: user.id,
        },
        {
            status: '1',
        });
    }

    acceptFriendRes(user, data) {
        return this.create({
            userId: user.id,
            friendId: data.friendId,
            received: data.friendId,
            status: '1',
        });
    }

    friendList(user) {
        return this.joinListBy('users', 'users.id', 'friends.received',
        {
            userId: user.id,
            status: '1',
        });
    }

    friendReq(user) {
        return this.joinListBy('users', 'users.id', 'friends.userId',
        {
            received: user.id,
            status: '0',
        });
    }

    unfriendReq(user, data) {
        return this.delete({
            userId: user.id,
            received: data.friendId,
        });
    }

    unfriendRes(user, data) {
        return this.delete({
            received: user.id,
            userId: data.friendId,
        });
    }
}

export default FriendRepository;
