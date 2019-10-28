import BaseController from '../../../infrastructure/Controllers/BaseController';
import FriendService from '../Services/FriendService';
import AuthService from '../../Auth/Services/AuthService';

class FriendController extends BaseController {
  constructor() {
    super();
    this.friendService = FriendService.getService();
    this.authService = AuthService.getService();
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
        const friendData = await this.friendService.queryFrJustSent(user, data); //query ra data vua moi tao
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
    return res.json();
  }

  async unfriend(req, res) {
    const data = req.body;
    const { user } = req.session;
    await this.friendService.unfriendReq(user, data);
    await this.friendService.unfriendRes(user, data);
    return res.json();
  }
}

export default FriendController;