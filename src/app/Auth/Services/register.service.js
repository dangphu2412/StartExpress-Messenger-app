import regisRepo from '../Repositories/register.repo';

class Register {
    constructor(data) {
        this.data = data;
    }

    hasData() {
        if (!this.data) {
            throw new Error('Your data is empty');
        }
        if (!this.data.email) {
            this.data.email = '';
        }
        if (!this.data.phone) {
            this.data.phone = '';
        }
    }

    hasMail() {
        if (!this.data.email) {
            throw new Error('Email is not exist');
        }
        return regisRepo.checkUserEmail(this.data.email);
    }

    hasPhone() {
        if (!this.data.phoneNumber) {
            throw new Error('Phone number is not exist');
        }
        return regisRepo.checkUserPhone(this.data.phoneNumber);
    }

    createUserChat(userData) {
        return regisRepo.createUserChat(userData);
    }

    async register() {
        this.hasData();
        const name = `${this.data.firstName} ${this.data.lastName}`;
        this.name = name;
        await regisRepo.register(this.data);
        await this.createUserChat(this.data);
    }
}

export default Register;
