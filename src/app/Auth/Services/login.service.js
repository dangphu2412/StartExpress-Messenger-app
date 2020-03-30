import jwt from 'jsonwebtoken';
import loginRepo from '../Repositories/login.repo';

class Login {
    constructor({ email, password, phoneNumber }) {
        this.password = password;
        if (email) {
            this.email = email;
        }
        if (phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
    }

    validateLoginByEmail() {
        return loginRepo.loginByEmail(this.email, this.password);
    }

    validateLoginPhone() {
        return loginRepo.loginByPhone(this.phone, this.password);
    }

    generateToken(userData, userId) {
        const user = {
            _token: userData._id,
            userEmail: this.email,
            id: userId,
        };
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_KEY);
        return token;
    }

    getUserId() {
        return loginRepo.getUserId(this.email);
    }
}

export default Login;
