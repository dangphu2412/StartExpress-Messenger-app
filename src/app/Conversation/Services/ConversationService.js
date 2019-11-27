import Repository from '../Repositories/ConversationRepository';
import AuthRepository from '../../Auth/Repositories/AuthRepository';

class ConversationService {
  static conversationService;

  static io;

  static ioNotify;

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
    ConversationService.io.in(data.idChat).emit('messReceived', data);
    const memberIds = await this.repository.queryMemberIds(data.idChat);
    memberIds.userIds.map((e) => {
      ConversationService.ioNotify.in(e._id).emit('notifyMess', data);
      return e;
    });
    return this.repository.saveMessChat(data);
  }

  queryMess(data) {
    return this.repository.queryMess(data);
  }

  updateLatestMess(data) {
    return this.repository.updateLatestMess(data);
  }
}

export default ConversationService;
