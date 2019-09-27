import BaseController from '../../../infrastructure/Controllers/BaseController';
import FriendService from '../Services/ConversationService';
import AuthService from '../../Auth/Services/AuthService';

class FriendController extends BaseController {
  constructor() {
    super();
    this.conversation = ConversationService.getService();
    this.friendService = FriendService.getService();
    this.authService = AuthService.getService();
  }

  conversation(req, res) {
    res.render('app/conversation/index');
  }

export default FriendController;