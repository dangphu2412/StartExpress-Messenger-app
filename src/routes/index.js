import express from 'express';
import conversationRouter from '../app/Conversation/Routes/routes';
import authRouter from '../app/Auth/Routes/routes';
import authenUser from '../app/Auth/Middleware/AuthMiddleware';
import friendRouter from '../app/Friend/Routes/routes';

const router = express.Router();

router.use(authRouter);

router.use(friendRouter);

router.get('/', authenUser.verifyAuth, (req, res) => res.redirect('/conversations'));

router.get('/conversations', (req, res) => res.render('app/conversation/index'));
// router.use(conversationRouter);

export default router;
