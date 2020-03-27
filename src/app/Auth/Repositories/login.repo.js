import query from '../../../infrastructure/Repositories/BaseRepository';
import model from '../../../database/model';

function loginByEmail(email, password) {
    return model.User.find({
        email,
        password,
    });
}

function getUserId(email) {
    return query.getBy('users', {
        email,
    },
    ('id'));
}

function loginByPhone(phone, password) {
    return model.User.find({
        phone,
        password,
    });
}

export default {
    loginByEmail,
    loginByPhone,
    getUserId,
};
