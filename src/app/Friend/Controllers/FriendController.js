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
    data.friendId = userCheck.id;
    const friendCheck = await this.friendService.checkFriend(user, data);
    if (userCheck) {
      if (!friendCheck) {
        await this.friendService.createFriendReq(user, data);
        await this.friendService.createFriendRes(user, data);
        data.sent = 'sent';
        return res.json(data);
      }
      return res.json(data);
    }
    return res.json(data);
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