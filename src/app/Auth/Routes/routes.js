import express from 'express';
import Controller from '../Controllers/AuthController';
import authenUser from '../Middleware/AuthMiddleware';

const router = express.Router();
const controller = new Controller();

router.route('/register')
    .get(authenUser.verifyNotAuth, controller.callMethod('register'));

router.route('/register-phone-number')
    .get(authenUser.verifyNotAuth, controller.callMethod('registerByPhoneNumber'))
    .post(authenUser.verifyNotAuth, controller.callMethod('registerByPhoneNumberPost'));



router.route('/login-phone-number')
    .get(authenUser.verifyNotAuth, controller.callMethod('loginPhoneNumber'))
    .post(authenUser.verifyNotAuth, controller.callMethod('loginPhoneNumberPost'));

router.get('/login', authenUser.verifyNotAuth, controller.callMethod('login'));

router.get('/reset-password', controller.callMethod('resetPassword'));

router.get('/logout', controller.callMethod('logout'));

// Page call
router.get(('/register-email'), authenUser.verifyNotAuth, controller.callMethod('registerEmailPage'));
router.get('/login-email', authenUser.verifyNotAuth, controller.callMethod('loginEmailPage'));

// Api call
router.post('/api/register-email', authenUser.verifyNotAuth, controller.callMethod('registerByEmail'));
router.post('/api/login-email', authenUser.verifyNotAuth, controller.callMethod('loginByEmail'));


export default router;
