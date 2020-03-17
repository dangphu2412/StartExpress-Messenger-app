import Repository from '../Repositories/ConversationRepository';
import AuthRepository from '../../Auth/Repositories/AuthRepository';

class ConversationService {
  static conversationService;

  constructor() {
    this.repository = Repository.getRepository();
    this.authRepository = AuthRepository.getRepository();
  }

  static getService() {
    if (!this.conversationService) {
      this.conversationService = new this();
    }
    return this.conversationService;
  }
}

export default ConversationService;
