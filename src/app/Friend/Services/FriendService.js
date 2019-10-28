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

  queryFrJustSent(user, data) {
    return this.repository.queryFrJustSent(user, data);
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

  friendReq(user) {
    return this.repository.friendReq(user);
  }

  unfriendReq(user, data) {
    return this.repository.unfriendReq(user, data);
  }

  unfriendRes(user, data) {
    return this.repository.unfriendRes(user, data);
  }
}

export default FriendService;
