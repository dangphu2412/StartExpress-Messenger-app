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
        const create = await model.Conversation.create({
            name: data.name,
            description: data.description,
            userIds: data['_id[]'],
            memberId: data['id[]'],
        });
        console.log(create);
    return create;
    }

    async queryGroupChat(user) {
        const query = await model.Conversation.find({
            memberId: user.id,
        });
        return query;
    }
}

export default ConversationRepository;
