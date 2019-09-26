import express from 'express';
import Controller from '../Controllers/AuthController';

const router = express.Router();
const controller = new Controller();

router.route('/register')
    .get(controller.callMethod('register'));

router.route('/register-phone-number')
    .get(controller.callMethod('registerByPhoneNumber'))
    .post(controller.callMethod('registerByPhoneNumberPost'));

router.route('/register-email')
    .get(controller.callMethod('registerByEmail'))
    .post(controller.callMethod('registerByEmailPost'));

router.route('/login-email')
    .get(controller.callMethod('loginEmail'))
    .post(controller.callMethod('loginEmailPost'));

router.route('/login-phone-number')
    .get(controller.callMethod('loginPhoneNumber'))
    .post(controller.callMethod('loginPhoneNumberPost'));

router.get('/login', controller.callMethod('login'));

router.get('/reset-password', controller.callMethod('resetPassword'));

router.get('/logout', controller.callMethod('logout'));

export default router;
