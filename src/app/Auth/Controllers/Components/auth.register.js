import RegisterService from '../../Services/register.service';
import admin from '../../../../config/firebase';

async function registerByEmail(req, res) {
    try {
        const data = req.body;
        const service = new RegisterService(data);

        const hasUser = await service.hasMail();

        if (hasUser) {
            return res.status(409).json({
                message: 'This account has already existed',
            });
        }

        await service.register(data);

        return res.status(201).json({
            message: 'Create successfully',
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Bad request',
        });
    }
}

async function registerByPhoneNumber(req, res) {
    const data = req.body;
    const service = new RegisterService(data);
    try {
        const { uid } = await admin.auth().verifyIdToken(data.password);
        if (uid) {
            const hasUser = await service.hasPhone();
            if (hasUser) {
                res.status(402).json({
                    message: 'Your phone has been registed',
                });
            }

            await service.register(data);

            return res.status(201).json({
                message: 'Create successfully',
            });
        }
    } catch (error) {
        return res.status(402).send('Your admin has been fault');
    }
}

export default {
    registerByEmail,
    registerByPhoneNumber,
};
