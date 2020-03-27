import express from 'express';
import renderController from '../Controllers/render.auth.controller';
import apiController from '../Controllers/auth.controller';
import validate from '../Middleware/auth.middleware';

const router = express.Router();
// Page call
router.get('/register', validate.renderNotVerifyAuth, renderController.registerPage);
router.get(('/register-email'), validate.renderNotVerifyAuth, renderController.registerEmail);
router.get('/register-phone-number', validate.renderNotVerifyAuth, renderController.registerPhone);

router.get('/login', validate.renderNotVerifyAuth, renderController.loginPage);
router.get('/login-email', validate.renderNotVerifyAuth, renderController.loginEmail);
router.get('/login-phone-number', validate.renderNotVerifyAuth, renderController.loginPhone);

// Api call
router.post('/api/register-email', apiController.register.registerByEmail);
router.post('/api/register-phone-number', apiController.register.registerByPhoneNumber);
router.post('/api/login-email', apiController.login.loginByEmail);
router.post('/api/login-phone-number', apiController.login.loginByPhoneNumber);
router.post('/api/logout', apiController.logout);

export default router;
