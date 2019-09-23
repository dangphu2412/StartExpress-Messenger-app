import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';
import knex from '../../../database/connection';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }

  login(req, res) {
    return res.render('app/login');
  }

  loginPost(req, res) {
    return res.redirect('/conversations');
  }

  loginPhoneNumber(req, res) {
    return res.render('app/login-phone-number');
  }

  loginPhoneNumberPost(req) {
    console.log(req.body);
  }

  register(req, res) { 
    res.render('app/auth/register');
  }

  async registerPost(req, res) {
    const data = req.body;
    await knex('users').insert(data)
        .then(() => {
        console.log('success');       
        })
        .catch((error) => {
        console.log(error);
        });
  }

  registerByEmail(req, res) {
    return res.render('app/auth/register-email');
  }

  resetPassword(req, res) {
    res.render('app/reset-password');
  }

  async authenEmail(req, res) {
    const data = req.body;
    const user = knex('users').select('email');
    if (await user.where({ email: data.email, password: data.password }).first()) {
        req.session.user = data;
        req.session.save();
        data.href = '/';
        return res.json(data);
    }
    return res.json({ response: 'die' });
  }

  logout(req, res) {
    delete req.session.user;
    return res.redirect('/login');
  }
}

export default AuthController;
