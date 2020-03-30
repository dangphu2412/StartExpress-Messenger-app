import admin from '../../../../config/firebase';
import LoginService from '../../Services/login.service';
import cookieOptions from '../../../../config/cookie';

async function loginByEmail(req, res) {
    try {
        const data = req.body;

        const service = new LoginService(data);

        const userData = (await service.validateLoginByEmail())[0];

        if (userData) {
            const { id } = await service.getUserId();
            const token = service.generateToken(userData, id);
            res.cookie('token', token, cookieOptions);
            return res.status(200).json({
                message: 'Login success',
                token,
            });
        }

        return res.status(403).json({
            message: 'Login failed',
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

async function loginByPhoneNumber(req, res) {
    try {
        const data = req.body;

        const service = new LoginService(data);

        const { uid } = await admin.auth().verifyIdToken(data.idToken);

        if (uid) {
            const userData = (await service.validateLoginByEmail())[0];

            if (userData) {
                const token = service.generateToken(userData);
                res.cookie('token', token, cookieOptions);
            }

            return res.status(201).json({
                message: 'Login successfully',
            });
        }
    } catch (error) {
        return res.status(402).json({
            message: error.message,
        });
    }
}

export default {
    loginByEmail,
    loginByPhoneNumber,
};
