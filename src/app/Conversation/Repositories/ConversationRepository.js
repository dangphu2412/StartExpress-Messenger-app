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

    async createGroupChat(name, description, friendInfo) {
        const create = await model.Conversation.create({
            name,
            description,
            member: friendInfo,
        });
        console.log(create);
    return create;
    }

    async queryGroupChat(user) {
        const query = await model.Conversation.find({
            'member.firstName': user.firstName,
        });
        return query;
    }
}

export default ConversationRepository;
