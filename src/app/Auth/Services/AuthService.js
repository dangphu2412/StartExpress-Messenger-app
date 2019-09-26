import admin from 'firebase-admin';
import Repository from '../Repositories/AuthRepository';
import knex from '../../../database/connection';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://<FIREBASE_PROJECT_ID>.firebaseio.com',
});

class AuthService {
  static service;

  constructor() {
    this.repository = Repository.getRepository();
  }

  static getService() {
    if (!this.service) {
      this.service = new this();
    }
    return this.service;
  }

  async registerByEmailPost(req, res) {
    const data = req.body;
    
    const userCheck = knex('users').where('email', data.email).first();
    if (await userCheck) {
      return res.json();
    }
    await knex('users').insert(data);
    data.success = true;
    return res.json(data);
  }

  async registerByPhoneNumberPost(req, res) {
    const data = req.body;
    admin.auth().verifyIdToken(data.idToken).then(async (decodedToken) => {
      const { uid } = decodedToken;
      if (uid) {
        const userCheck = knex('users').where({ phoneNumber: data.phoneNumber }).first();
        if (await userCheck) {
            res.json(data);
        }
        await knex('users').insert({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        });
        data.success = true;
        return res.json(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
    }

  async loginPost(req, res) {
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
}

export default AuthService;
