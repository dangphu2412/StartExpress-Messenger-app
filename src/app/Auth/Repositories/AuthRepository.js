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
    return this.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      avatar: 'unknown',
      phoneNumber: 'unknown',
      city: 'unknown',
      describe: 'unknown',
    });
  }

  registerPhoneNumber(data) {
    return this.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: 'unknown',
      phoneNumber: data.phoneNumber,
      avatar: 'unknown',
      city: 'unknown',
      describe: 'unknown',
    });
  }

  loginEmailCheck(data) {
    return this.getBy({
      email: data.email,
      password: data.password,
    });
  }
}

export default AuthRepository;
