import BaseController from '../../../infrastructure/Controllers/BaseController';
import AuthService from '../Services/AuthService';
import admin from '../../../config/firebase';

class AuthController extends BaseController {
  constructor() {
    super();
    this.authService = AuthService.getService();
  }

  register(req, res) {
    return res.render('app/auth/register');
  }

  registerByEmail(req, res) {
    return res.render('app/auth/register-email');
  }

  async registerByEmailPost(req, res) {
    const data = req.body;
    const userCheck = await this.authService.checkUserEmail(data);
    if (userCheck) {
      return res.json();
    }
    const user = await this.authService.registerByEmailPost(data);
    await this.authService.createUserChat(user[0]);
    data.success = true;
    return res.json(data);
  }

  registerByPhoneNumber(req, res) {
    return res.render('app/auth/register-phone-number');
  }

  async registerByPhoneNumberPost(req, res) {
    const data = req.body;
    try {
      const { uid } = await admin.auth().verifyIdToken(data.idToken);
      if (uid) {
        const userCheck = await this.authService.checkUserPhone(data);
        if (userCheck) {
            res.json(data);
        }
        const user = await this.authService.registerByPhoneNumber(data);
        await this.authService.createUserChat(user[0]);
        data.success = true;
        return res.json(data);
      }
    } catch (error) {
      return res.status(402).send('Your admin has been fault');
    }
  }

  resetPassword(req, res) {
    return res.render('app/reset-password');
  }

  login(req, res) {
    return res.render('app/log/login');
  }

  loginEmail(req, res) {
    return res.render('app/log/login-email');
  }

  async loginEmailPost(req, res) {
    const data = req.body;
    const user = await this.authService.loginEmailCheck(data);
    if (user) {
        const chatId = await this.authService.getUserChatId(user.id);
        user._id = chatId._id;
        req.session.user = user;
        req.session.save();
        data.href = '/';
        return res.json(data);
    }
    return res.json({ response: 'die' });
  }

  loginPhoneNumber(req, res) {
    return res.render('app/log/login-phone-number');
  }

  async loginPhoneNumberPost(req, res) {
    const data = req.body;
      const { uid } = await admin.auth().verifyIdToken(data.idToken);
      if (uid) {
        const userCheck = await this.authService.registerPhoneCheck;
        if (userCheck) {
          req.session.user = data.phoneNumber;
          data.success = true;
          res.json(data);
        }
        return res.json(data);
      }
  }

  logout(req, res) {
    delete req.session.user;
    return res.redirect('/login');
  }
}

export default AuthController;
