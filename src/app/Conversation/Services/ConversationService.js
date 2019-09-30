import Repository from '../Repositories/ConversationRepository';

class ConversationService {
  static conversationService;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.conversationService) {
      this.conversationService = new this();
    }
    return this.conversationService;
  }
}

export default ConversationService;
