import Repository from '../Repositories/ConversationRepository';

class AuthService {
  static conversationService;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.friendService) {
      this.friendService = new this();
    }
    return this.friendService;
  }
}

export default AuthService;
