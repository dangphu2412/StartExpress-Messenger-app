import regisRepo from '../Repositories/register.repo';

class Register {
    constructor(data) {
        if (!data.email) {
            this.userName = {
                email: '',
                phone: data.phone,
            };
        }
        if (!data.phone) {
            this.userName = {
                email: data.email,
                phone: '',
            };
        }
        this.data = data;
    }

    hasData() {
        if (!this.data) {
            throw new Error('Your data is empty');
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

    createUserChat(userData, userId, userName) {
        return regisRepo.createUserChat(userData, userId, userName);
    }

    async register() {
        this.hasData();
        const name = `${this.data.firstName} ${this.data.lastName}`;
        this.data.name = name;
        const userId = (await regisRepo.register(this.data, this.userName))[0];
        await this.createUserChat(this.data, userId, this.userName);
    }
}

export default Register;
