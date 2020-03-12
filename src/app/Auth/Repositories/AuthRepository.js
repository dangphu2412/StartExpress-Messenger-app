import BaseRepository from '../../../infrastructure/Repositories/BaseRepository';
import model from '../../../database/model';

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

  loginByEmail(data) {
    return this.getBy({
      email: data.email,
      password: data.password,
    });
  }

  friendInfor() {
    return this.list();
  }

  queryUserData(data) {
    return this.listByFirst({
      firstName: data,
    },
    ['id',
    'firstName',
    'email']);
  }

  async queryUserChat(data) {
    const userData = await model.User.find({
      name: { $in: data },
    }, '_id');
    return userData;
  }

  async queryInfoChat(member) {
    const query = await model.User.find({
      id: { $in: member },
    });
    return query;
  }

  createUserChat(user) {
    const createMongo = model.User
    .create({
      id: user.id,
      name: user.firstName,
      avatar: user.avatar,
    });
    return createMongo;
  }

  async queryUser(data) {
    console.log(data);
    const search = await model.User.find({
        name: { $regex: data, $options: 'i' },
    });
    return search;
  }

  async getUserChatId(data) {
    const userId = await model.User
    .findOne({
      id: data,
    })
    .select('_id');
    return userId;
  }
}

export default AuthRepository;
