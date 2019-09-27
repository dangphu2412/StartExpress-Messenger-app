import Repository from '../Repositories/AuthRepository';

class AuthService {
  static service;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.service) {
      this.service = new this();
    }
    return this.service;
  }

  checkUserEmail(data) {
    return this.repository.checkUserEmail(data);
  }

  checkUserPhone(data) {
    return this.repository.checkUserPhone(data);
  }

  checkFriend(user, data) {
    return this.repository.checkFriend(user, data);
  }

  registerByEmailPost(data) {
    return this.repository.registerUserEmail(data);
  }

  registerByPhoneNumberPost(data) {
    return this.repository.registerPhoneNumber(data);
  }

  loginEmailCheck(data) {
    return this.repository.loginEmailCheck(data);
  }
}

export default AuthService;
