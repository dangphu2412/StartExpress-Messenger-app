import express from 'express';
import Controller from '../Controllers/AuthController';

const router = express.Router();
const controller = new Controller();

router.route('/login')
    .get(controller.callMethod('login'))
    .post(controller.callMethod('loginPost'));

router.route('/login-phone-number')
    .get(controller.callMethod('loginPhoneNumber'))
    .post(controller.callMethod('loginPhoneNumberPost'));

router.route('/register') 
    .get(controller.callMethod('register'))
    .post(controller.callMethod('registerPost'));

router.get('/register-email', controller.callMethod('registerByEmail'));

router.post('/authenEmail', controller.callMethod('authenEmail'));

router.get('/reset-password', controller.callMethod('resetPassword'));

router.get('/logout', controller.callMethod('logout'));

export default router;
