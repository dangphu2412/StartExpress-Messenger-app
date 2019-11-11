import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
import model from '../../../database/model';

class ConversationRepository extends BaseRepository {
    static repository;

    static getRepository() {
        if (!this.repository) {
            this.repository = new this();
        }
        return this.repository;
    }

    getTableName() {
        return 'users';
    }

    async createGroupChat(data) {
        const create = await model.Conversation
        .create({
            name: data.name,
            description: data.description,
            userIds: data['_id[]'],
            memberId: data['id[]'],
        });
    return create;
    }

    async queryGroupChat(user) {
        const query = await model.Conversation
        .find({
            memberId: user.id,
        })
        .sort({ updatedAt: 'descending' })
        .populate('userIds');
        return query;
    }

    async createFriendChat(id, ids) {
        const createFriendChat = await model.Conversation
        .create({
            name: '',
            description: '',
            userIds: ids,
            memberId: id,
        });
        return createFriendChat;
    }
}

export default ConversationRepository;
