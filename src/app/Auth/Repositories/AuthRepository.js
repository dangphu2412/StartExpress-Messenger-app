import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';

class AuthRepository extends BaseRepository {
  static repository;

  static getRepository() {
    if (!this.repository) {
      this.repository = new this();
    }

    return this.repository;
  }

  getTableName() {
    return 'users';
  }

  checkUserEmail(data) {
    return this.getBy({
      email: data.email,
    });
  }

  checkUserPhone(data) {
    return this.getBy({
      phoneNumber: data.phoneNumber,
    });
  }

  registerUserEmail(data) {
    return this.create(data);
  }

  registerPhoneNumber(data) {
    return this.create({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    });
  }

  loginEmailCheck(data) {
    return this.getBy({
      email: data.email,
      password: data.password,
    })
  }
}

export default AuthRepository;
