import Repository from '../Repositories/ConversationRepository';

class ConversationService {
  static conversationService;

  static io;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.conversationService) {
      this.conversationService = new this();
    }
    return this.conversationService;
  }

  async createGroupChat(data) {
    console.log(data);
    const createInfo = await this.repository.createGroupChat(data);
    return createInfo;
  }

  async groupChat(user) {
    const queryGroupChat = await this.repository.queryGroupChat(user);
    return queryGroupChat;
  }
}

export default ConversationService;
