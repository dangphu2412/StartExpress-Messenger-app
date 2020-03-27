import query from '../../../infrastructure/Repositories/BaseRepository';
import model from '../../../database/model/index';

function checkUserEmail(email) {
    return query.getBy('users', {
      email,
    });
}

function register(data, userName) {
  const { name, password } = data;
  const { email, phone } = userName;
  return query.create('users', {
    name,
    email,
    phone,
    password,
  }, 'id');
}

function createUserChat(data, userId, userName) {
  const { name, password } = data;
  const { email, phone } = userName;
  return model.User
    .create({
      userId,
      name,
      email,
      password,
      phone,
    });
}

export default {
  checkUserEmail,
  register,
  createUserChat,
};
