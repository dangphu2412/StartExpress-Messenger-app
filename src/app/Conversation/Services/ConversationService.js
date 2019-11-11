import Repository from '../Repositories/ConversationRepository';
import AuthRepository from '../../Auth/Repositories/AuthRepository';

class ConversationService {
  static conversationService;

  static io;

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

  async createGroupChat(data) {
    const createInfo = await this.repository.createGroupChat(data);
    return createInfo;
  }

  async groupChat(user) {
    const queryGroupChat = await this.repository.queryGroupChat(user);
    return queryGroupChat;
  }

  async createFriendChat(user, data) {
    const member = [];
    let memberIds = [];
    member.push(user.id, data.friendId);
    const friendMongoId = await this.authRepository.queryInfoChat(member);
    memberIds = friendMongoId.map((e) => e._id);
    const createFriendChat = await this.repository.createFriendChat(member, memberIds);
    return createFriendChat;
  }

  async handleMess(data) {
    ConversationService.io.to(data.idChat).emit('sendMess', data.mess);
    return data;
  }
}

export default ConversationService;
