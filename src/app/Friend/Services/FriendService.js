import Repository from '../Repositories/FriendRepository';

class FriendService {
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

  createFriendReq(user, data) {
    return this.repository.createFriendReq(user, data);
  }

  createFriendRes(user, data) {
    return this.repository.createFriendRes(user, data);
  }

  acceptFriendReq(user, data) {
    return this.repository.acceptFriendReq(user, data);
  }

  acceptFriendRes(user, data) {
    return this.repository.acceptFriendRes(user, data);
  }

  friendList(user) {
    return this.repository.friendList(user);
  }
}

export default FriendService;
