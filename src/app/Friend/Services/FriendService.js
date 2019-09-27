import Repository from '../Repositories/FriendRepository';

class AuthService {
  static friendService;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.friendService) {
      this.friendService = new this();
    }
    return this.friendService;
  }

  checkUserEmail(data) {
    return this.repository.checkUserEmail(data);
  }
  
  checkFriend(user, data) {
    return this.repository.checkFriend(user, data);
  }

  createFriend(user, data) {
    return this.repository.createFriend(user, data);
  }
}

export default AuthService;
