import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }

  register(req, res) {
    return res.render('app/auth/register');
  }

  registerByEmail(req, res) {
    return res.render('app/auth/register-email');
  }

  async registerByEmailPost(req, res) {
    return Service.getService().registerByEmailPost(req, res);
  }

  registerByPhoneNumber(req, res) {
    return res.render('app/auth/register-phone-number');
  }

  async registerByPhoneNumberPost(req, res) {
    return Service.getService().registerByPhoneNumberPost(req, res);
  }

  resetPassword(req, res) {
    return res.render('app/reset-password');
  }

  login(req, res) {
    return res.render('app/log/login');
  }

  loginPhoneNumber(req, res) {
    return res.render('app/log/login-phone-number');
  }

  async loginPhoneNumberPost(req, res) {
    return Service.getService().loginPhoneNumberPost(req, res);
  }

  loginEmail(req, res) {
    return res.render('app/log/login-email');
  }

  async loginEmailPost(req, res) {
    return Service.getService().loginEmailPost(req, res);
  }

  logout(req, res) {
    delete req.session.user;
    return res.redirect('/login');
  }
}

export default AuthController;
