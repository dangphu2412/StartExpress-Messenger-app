import Repository from '../Repositories/AuthRepository';

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

  async checkUserEmail(data) {
    const checkUserEmail = await this.repository.checkUserEmail(data);
    return checkUserEmail;
  }

  async checkUserPhone(data) {
    const checkUserPhone = await this.repository.checkUserPhone(data);
    return checkUserPhone;
  }

  async registerByEmailPost(data) {
    const registerByEmailPost = await this.repository.registerUserEmail(data);
    return registerByEmailPost;
  }

  async registerByPhoneNumberPost(data) {
    const registerByPhoneNumberPost = await this.repository.registerPhoneNumber(data);
    return registerByPhoneNumberPost;
  }

  async loginEmailCheck(data) {
    const loginEmailCheck = await this.repository.loginEmailCheck(data);
    return loginEmailCheck;
  }

  async friendInfor() {
    const friendInfor = await this.repository.friendInfor();
    return friendInfor;
  }

  async queryUserData(data) {
    const queryInfo = await this.repository.queryUserData(data);
    return queryInfo;
  }
}

export default AuthService;
