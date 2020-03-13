import express from 'express';
import Controller from '../Controllers/AuthController';
import authenUser from '../Middleware/AuthMiddleware';

const router = express.Router();
const controller = new Controller();

router.route('/register')
    .get(authenUser.verifyNotAuth, controller.callMethod('register'));




router.get('/login', authenUser.verifyNotAuth, controller.callMethod('login'));

router.get('/reset-password', controller.callMethod('resetPassword'));

router.get('/logout', controller.callMethod('logout'));

// Page call
router.get(('/register-email'), authenUser.verifyNotAuth, controller.callMethod('registerEmailPage'));
router.get('/register-phone-number', authenUser.verifyNotAuth, controller.callMethod('registerPhoneNumberPage'));
router.get('/login-email', authenUser.verifyNotAuth, controller.callMethod('loginEmailPage'));
router.get('/login-phone-number', authenUser.verifyNotAuth, controller.callMethod('loginPhoneNumberPage'));

// Api call
router.post('/api/register-email', authenUser.verifyNotAuth, controller.callMethod('registerByEmail'));
router.post('/api/login-email', authenUser.verifyNotAuth, controller.callMethod('loginByEmail'));
router.post('/api/login-phone-number', authenUser.verifyNotAuth, controller.callMethod('loginByPhoneNumber'));
router.post('/api/register-phone-number', authenUser.verifyNotAuth, controller.callMethod('registerByPhoneNumber'));


export default router;
