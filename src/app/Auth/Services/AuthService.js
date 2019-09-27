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

  checkUserEmail(data) {
    return this.repository.checkUserEmail(data);
  }

  checkUserPhone(data) {
    return this.repository.checkUserPhone(data);
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
