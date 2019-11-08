import BaseController from '../../../infrastructure/Controllers/BaseController';
import FriendService from '../../Friend/Services/FriendService';
import AuthService from '../../Auth/Services/AuthService';
import ConversationService from '../Services/ConversationService';

class ConversationController extends BaseController {
  constructor() {
    super();
    this.conversationService = ConversationService.getService();
    this.friendService = FriendService.getService();
    this.authService = AuthService.getService();
  }

  redirectCoreView(req, res) {
    return res.redirect('/conversations');
  }

  async conversation(req, res) {
    const { user } = req.session;
    const friendList = await this.friendService.friendList(user); // list fr
    const friendReq = await this.friendService.friendReq(user);   // friend request
    const member = friendList.map((e) => e.id);  // copy id into member
    member.push(user.id);
    const friendInfo = await this.authService.friendInfo(member); // query information of user in mongo
    const groupChat = await this.conversationService.groupChat(user);
    return res.render('app/conversation/index', { friendList, friendReq, friendInfo, groupChat, user });
  }

  uploadImgProfile(req, res) {
    const { file } = req;
    console.log(file);

    console.log(req.body);
    return res.json(file);
  }

  async createGroup(req, res) {
    const data = req.body;
    await this.conversationService.createGroupChat(data);
    return res.json('hello');
  }

  async searchUser(req, res) {
    const data = req.body.value;
    const value = await this.authService.queryUser(data);
    return res.json(value);
  }
}

export default ConversationController;
