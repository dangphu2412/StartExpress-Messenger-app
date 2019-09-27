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
            friendId: data.friendId
        },
        {
            userId: data.friendId,
            friendId: user.id,
        });
    }

    createFriend(user, data) {
        return this.create({
            userId: user.id,
            friendId: data.friendId,
            received: data.friendId,
            status: '0',
        });
    }
}

export default FriendRepository;
