import Repository from '../Repositories/FriendRepository';

class FriendService {
  static friendService;

  static io;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.friendService) {
      this.friendService = new this();
    }
    return this.friendService;
  }

  async checkUserEmail(data) {
    const checkUserEmail = await this.repository.checkUserEmail(data);
    return checkUserEmail;
  }

  async checkFriend(user, data) {
    const checkFriend = await this.repository.checkFriend(user, data);
    return checkFriend;
  }

  async createFriendReq(user, data) {
    const createFriendReq = await this.repository.createFriendReq(user, data);
    return createFriendReq;
  }

  async queryFrJustSent(user, data) {
    const queryFrJustSent = await this.repository.queryFrJustSent(user, data);
    const io = FriendService.io.of('conversations');
    // io.on('connection', (socket) => {
    //   socket.broadcast.emit('sendFriendReq', queryFrJustSent);
    // });
    io.emit('sendFriendReq', queryFrJustSent);
    return queryFrJustSent;
  }

  async acceptFriendReq(user, data) {
    const acceptFriendReq = await this.repository.acceptFriendReq(user, data);
    return acceptFriendReq;
  }

  async acceptFriendRes(user, data) {
    const acceptFriendRes = await this.repository.acceptFriendRes(user, data);
    return acceptFriendRes;
  }

  async friendList(user) {
    const friendList = await this.repository.friendList(user);
    const io = FriendService.io.of('conversations');
    io.on('connection', (socket) => {
      socket.on('join', (say) => {
          console.log(say);
      });
    });
    return friendList;
  }

  async friendReq(user) {
    const friendReq = await this.repository.friendReq(user);
    return friendReq;
  }

  async unfriendReq(user, data) {
    const unfriendReq = await this.repository.unfriendReq(user, data);
    return unfriendReq;
  }

  async unfriendRes(user, data) {
    const unfriendRes = await this.repository.unfriendRes(user, data);
    return unfriendRes;
  }
}

export default FriendService;
