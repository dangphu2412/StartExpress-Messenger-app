import Repository from '../Repositories/auth.repository';

class AuthService {
  static authService;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.authService) {
      this.authService = new this();
    }
    return this.authService;
  }

  checkUserEmail(data) {
    return this.repository.checkUserEmail(data);
  }

  async checkUserPhone(data) {
    const checkUserPhone = await this.repository.checkUserPhone(data);
    return checkUserPhone;
  }

  registerByEmail(data) {
    return this.repository.registerUserEmail(data);
  }

  async createUserChat(user) {
    const create = await this.repository.createUserChat(user);
    return create;
  }

  async registerByPhoneNumberPost(data) {
    const registerByPhoneNumberPost = await this.repository.registerPhoneNumber(data);
    return registerByPhoneNumberPost;
  }

 loginByEmail(data) {
    return this.repository.loginByEmail(data);
  }

  async friendInfor() {
    const friendInfor = await this.repository.friendInfor();
    return friendInfor;
  }

  async queryUserData(data) {
    const queryInfo = await this.repository.queryUserData(data);
    return queryInfo;
  }

  async queryUserChat(data) {
    const queryUserChat = await this.repository.queryUserChat(data);
    return queryUserChat;
  }

  async friendInfo(member) {
    const friendInfo = await this.repository.queryInfoChat(member);
    return friendInfo;
  }

  async queryUser(data) {
    const queryUser = await this.repository.queryUser(data);
    return queryUser;
  }

  getUserChatId(data) {
    return this.repository.getUserChatId(data);
  }
}

export default AuthService;
