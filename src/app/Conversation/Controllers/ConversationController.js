import moment from 'moment';
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
    const member = friendList.map((e) => e.id);
    member.push(user.id);
    const friendInfo = await this.authService.friendInfo(member);
    const groupChat = await this.conversationService.groupChat(user);
    groupChat.forEach((e) => {
      if (e.name === '') {
        e.userIds.forEach((ids) => {
          if (ids._id !== user._id) {
            e.name = ids.name;
          }
        });
      }
    });
    return res.render('app/conversation/index', {
      friendList, friendReq, friendInfo, groupChat, user,
    });
  }

  uploadImgProfile(req, res) {
    const { file } = req;
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

  async sendMess(req, res) {
    const data = req.body;
    await this.conversationService.handleMess(data);
    const update = await this.conversationService.updateLatestMess(data);
    return res.json(update);
  }

  async queryMess(req, res) {
    const data = req.body;
    const chatData = await this.conversationService.queryMess(data);
    chatData.map((e) => {
      e.updatedAt = moment.unix(e.updatedAt).format('MMMM Do, h:mm a');
      return e;
    });
    return res.json(chatData);
  }

  async loadConversation(req, res) {
    const { user } = req.session;
    const friendList = await this.friendService.friendList(user);
    const friendReq = await this.friendService.friendReq(user);
    const member = friendList.map((e) => e.id);
    member.push(user.id);
    const friendInfo = await this.authService.friendInfo(member);
    const groupChat = await this.conversationService.groupChat(user);
    groupChat.forEach((e) => {
      if (e.name === '') {
        e.userIds.forEach((ids) => {
          if (ids._id !== user._id) {
            e.name = ids.name;
          }
        });
      }
    });
    return res.render('app/conversation/index', {
      friendList, friendReq, friendInfo, groupChat, user,
    });
  }
}

export default ConversationController;
