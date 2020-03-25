import express from 'express';
import renderController from '../Controllers/render.auth.controller';
import apiController from '../Controllers/auth.controller';

const router = express.Router();
// Page call
router.get('/register', renderController.registerPage);
router.get(('/register-email'), renderController.registerEmail);
router.get('/register-phone-number', renderController.registerPhone);

router.get('/login', renderController.loginPage);
router.get('/login-email', renderController.loginEmail);
router.get('/login-phone-number', renderController.loginPhone);

// Api call
router.post('/api/register-email', apiController.register.registerByEmail);
router.post('/api/register-phone-number', apiController.register.registerByPhoneNumber);
router.post('/api/login-email', apiController.login.loginByEmail);
router.post('/api/login-phone-number', apiController.login.loginByPhoneNumber);
router.post('/api/logout', apiController.logout);

export default router;
