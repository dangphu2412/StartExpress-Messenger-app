import model from '../../../database/model';

function loginByEmail(email, password) {
    return model.User.find({
        email,
        password,
    });
}

function loginByPhone(phone, password) {
    return model.User.find({
        phone,
        password,
    })
}

export default {
    loginByEmail,
    loginByPhone,
};
