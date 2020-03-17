import express from 'express';
import Controller from '../Controllers/AuthController';

const router = express.Router();
const controller = new Controller();

// Page call
router.get('/register', controller.callMethod('register'));
router.get(('/register-email'), controller.callMethod('registerEmailPage'));
router.get('/register-phone-number', controller.callMethod('registerPhoneNumberPage'));

router.get('/login', controller.callMethod('login'));
router.get('/login-email', controller.callMethod('loginEmailPage'));
router.get('/login-phone-number', controller.callMethod('loginPhoneNumberPage'));

router.get('/reset-password', controller.callMethod('resetPassword'));

router.get('/logout', controller.callMethod('logout'));

// Api call
router.post('/api/register-email', controller.callMethod('registerByEmail'));
router.post('/api/login-email', controller.callMethod('loginByEmail'));
router.post('/api/login-phone-number', controller.callMethod('loginByPhoneNumber'));
router.post('/api/register-phone-number', controller.callMethod('registerByPhoneNumber'));


export default router;
