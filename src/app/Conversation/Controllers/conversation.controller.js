import moment from 'moment';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import AuthService from '../../Auth/Services/auth.service';
import ConversationService from '../Services/conversation.service';

class ConversationController extends BaseController {
  constructor() {
    super();
    this.conversationService = ConversationService.getService();
    this.authService = AuthService.getService();
  }

  redirectCoreView(req, res) {
    return res.redirect('/conversations');
  }

  conversation(req, res) {
    return res.render('app/conversation/index');
  }
}

export default ConversationController;
