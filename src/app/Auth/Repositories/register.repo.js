import query from '../../../infrastructure/Repositories/BaseRepository';
import model from '../../../database/model/index';

function checkUserEmail(data) {
    return query.getBy('users', {
      email: data,
    });
}

function register(data) {
  const { name, email, phone, password } = data;
  return query.create('users', {
    name,
    email,
    phone,
    password,
  });
}

function createUserChat(user) {
  const {
    name, email, password, avatar, phone,
  } = user;
  return model.User
    .create({
      name,
      email,
      password,
      avatar,
      phone,
    });
}

export default {
  checkUserEmail,
  register,
  createUserChat,
};
