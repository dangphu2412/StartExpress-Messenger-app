import express from 'express';
import authRouter from '../app/Auth/Routes/routes';
import authenUser from '../app/Auth/Middleware/AuthMiddleware';

const router = express.Router();

router.use(authRouter);

router.get('/', authenUser.verifyAuth, (req, res) => res.redirect('/conversations'));

router.get('/conversations', authenUser.verifyAuth, (req, res) => res.render('app/conversation/index'));

export default router;
