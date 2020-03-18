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
}

export default ConversationRepository;
