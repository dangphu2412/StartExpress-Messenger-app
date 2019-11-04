import BaseController from '../../../infrastructure/Controllers/BaseController';
import FriendService from '../Services/FriendService';
import AuthService from '../../Auth/Services/AuthService';
import Conversation from '../../Conversation/Services/ConversationService';

class FriendController extends BaseController {
  constructor() {
    super();
    this.friendService = FriendService.getService();
    this.authService = AuthService.getService();
    this.conversationService = Conversation.getService();
  }

  async addFriend(req, res) {
    const { user } = req.session;
    const data = req.body;
    const userCheck = await this.authService.checkUserEmail(data);
    if (userCheck) {
      data.friendId = userCheck.id;
      const friendCheck = await this.friendService.checkFriend(user, data);
      if (!friendCheck) {
        await this.friendService.createFriendReq(user, data);
        const friendData = await this.friendService.queryFrJustSent(user, data);
        return res.json(friendData);
      }
      return res.json('sent');
    }
    return res.json('sent');
  }

  async acceptFriendReq(req, res) {
    const data = req.body;
    const { user } = req.session;
    await this.friendService.acceptFriendReq(user, data);
    await this.friendService.acceptFriendRes(user, data);
    return res.json('success');
  }

  async unfriend(req, res) {
    const data = req.body;
    const { user } = req.session;
    await this.friendService.unfriendReq(user, data);
    await this.friendService.unfriendRes(user, data);
    return res.json();
  }

  async createGroup(req, res) {
    const data = req.body['user[]'];
    const { description } = req.body;
    const { name } = req.body;
    const friendInfo = [];
    // const info = await this.authService.queryUserData(data);
    // console.log(info);
    // friendInfo.push(info);
    // data.forEach((e) => {
    //     const info = this.authService.queryUserData(e);
    //     console.log(info);
    //     friendInfo.push(info);
    // });
    // await Promise.all(friendInfo);
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const info = await this.authService.queryUserData(element);
      friendInfo.push(info);
    }

    // const promiseInfo = data.map(async (option) => {
    //   console.log(option);
    //   const info = await this.authenService.queryUserData(option);
    //   return info;
    // });
    // const friendInfo = await Promise.all(promiseInfo);
    // console.log(friendInfo);
    
    await this.conversationService.createGroupChat(name, description, friendInfo);
    return res.json('hello');
  }
}

export default FriendController;
