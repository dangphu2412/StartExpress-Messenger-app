import Repository from '../Repositories/conversation.repository';
import AuthRepository from '../../Auth/Repositories/auth.repository';

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
