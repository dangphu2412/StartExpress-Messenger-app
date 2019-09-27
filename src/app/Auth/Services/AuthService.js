import admin from 'firebase-admin';
import Repository from '../Repositories/AuthRepository';
import knex from '../../../database/connection';



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

  registerEmailCheck(data) {
    return this.repository.checkUserEmail(data);
  }

  registerByEmailPost(data) {
    return this.repository.registerUserEmail(data);
  }

  registerPhoneCheck(data) {
    return this.repository.checkUserPhone(data);
  }

  registerByPhoneNumberPost(data) {
    return this.repository.registerPhoneNumber(data);
  }

  loginEmailCheck(data) {
    return this.repository.loginEmailCheck(data);
  }

  async loginPhoneNumberPost(req, res) {
    
  }
}
export default AuthService;
