import admin from 'firebase-admin';
import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_CERT),
  databaseURL: 'https://<FIREBASE_PROJECT_ID>.firebaseio.com',
});

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
    const data = req.body;
    const userCheck = await this.service.registerEmailCheck(data);
    if (await userCheck) {
      return res.json();
    }
    await this.service.registerByEmailPost(data);
    data.success = true;
    return res.json(data);
  }

  registerByPhoneNumber(req, res) {
    return res.render('app/auth/register-phone-number');
  }

  async registerByPhoneNumberPost(req, res) {
    const data = req.body;
    admin.auth().verifyIdToken(data.idToken).then(async (decodedToken) => {
      const { uid } = decodedToken;
      if (uid) {
        const userCheck = this.service.registerPhoneCheck(data);
        if (await userCheck) {
            res.json(data);
        }
        await this.service.registerByPhoneNumber(data);
        data.success = true;
        return res.json(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
    const user = this.service.loginEmailCheck(data);
    if (await user) {
        req.session.user = data;
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
    admin.auth().verifyIdToken(data.idToken).then(async (decodedToken) => {
      const { uid } = decodedToken;
      if (uid) {
        const userCheck = this.service.registerPhoneCheck;
        if (await userCheck) {
          req.session.user = data.phoneNumber;
          data.success = true;
          res.json(data);
        }
        return res.json(data);
      }
    });
  }

  async addFriend(req, res) {
    
  }

  logout(req, res) {
    delete req.session.user;
    return res.redirect('/login');
  }
}

export default AuthController;
