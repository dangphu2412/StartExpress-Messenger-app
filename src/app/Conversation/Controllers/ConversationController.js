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
    const friendList = await this.friendService.friendList(user);
    const friendReq = await this.friendService.friendReq(user);
    const groupChat = await this.conversationService.groupChat(user);
    return res.render('app/conversation/index', { friendList, friendReq, groupChat, user });
  }

  uploadImgProfile(req, res) {
    const { file } = req;
    console.log(file);

    console.log(req.body);
    return res.json(file);
  }
}

export default ConversationController;
