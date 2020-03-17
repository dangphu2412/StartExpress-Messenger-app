import jwt from 'jsonwebtoken';

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

  registerEmailPage(req, res) {
    return res.render('app/auth/register-email');
  }

  registerPhoneNumberPage(req, res) {
    return res.render('app/auth/register-phone-number');
  }

  login(req, res) {
    return res.render('app/log/login');
  }

  loginEmailPage(req, res) {
    return res.render('app/log/login-email');
  }

  loginPhoneNumberPage(req, res) {
    return res.render('app/log/login-phone-number');
  }

  resetPassword(req, res) {
    return res.render('app/reset-password');
  }

  logout(req, res) {
    delete req.session.user;
    return res.redirect('/login');
  }

  async registerByEmail(req, res) {
    try {
      const data = req.body;
      const hasUser = await this.authService.checkUserEmail(data);
      if (hasUser) {
        return res.status(409).json({
          message: 'This account has already existed'
        });
      }
      const user = await this.authService.registerByEmailPost(data);
      await this.authService.createUserChat(user[0]);
      return res.status(201).json({
        message: 'Create successfully'
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Bad request'
      });
    }
  }

  async registerByPhoneNumber(req, res) {
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
        return res.status(201).json({
          message: 'Create successfully'
        });
      }
    } catch (error) {
      return res.status(402).send('Your admin has been fault');
    }
  }

  async loginByEmail(req, res) {
    try {
      const data = req.body;
      const user = await this.authService.loginByEmail(data);

      if (user) {
          const chatId = await this.authService.getUserChatId(user.id);

          user._id = chatId._id;

          const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);

          req.session.user = user;
          req.session.save();
          return res.status(201).json({
            message: 'Login success',
            token
          });
      }

      return res.status(400).json({
        message: 'Login failed'
      });
  }
  catch (error) {
      return res.status(403).json({
        message: error.message
      });
    }
  }

  async loginByPhoneNumber(req, res) {
    try {
      const data = req.body;
      const { uid } = await admin.auth().verifyIdToken(data.idToken);
      if (uid) {
        const userCheck = await this.authService.registerPhoneCheck;
        if (userCheck) {
          req.session.user = data.phoneNumber;
          data.success = true;
          res.json(data);
        }
        return res.status(201).json({
          message: 'Login successfully'
        });
      }
    }
    catch (error) {
      return res.status(402).json({
        message: error.message
      });
    }
  }
}

export default AuthController;
