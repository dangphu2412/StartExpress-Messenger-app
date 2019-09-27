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

router.route('/register-email')
    .get(authenUser.verifyNotAuth, controller.callMethod('registerByEmail'))
    .post(authenUser.verifyNotAuth, controller.callMethod('registerByEmailPost'));

router.route('/login-email')
    .get(authenUser.verifyNotAuth, controller.callMethod('loginEmail'))
    .post(authenUser.verifyNotAuth, controller.callMethod('loginEmailPost'));

router.route('/login-phone-number')
    .get(authenUser.verifyNotAuth, controller.callMethod('loginPhoneNumber'))
    .post(authenUser.verifyNotAuth, controller.callMethod('loginPhoneNumberPost'));

router.get('/login', authenUser.verifyNotAuth, controller.callMethod('login'));

router.get('/reset-password', controller.callMethod('resetPassword'));

router.get('/logout', controller.callMethod('logout'));

export default router;
