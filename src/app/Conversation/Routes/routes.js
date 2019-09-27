import express from 'express';
import Controller from '../Controllers/ConversationController';
import authenUser from '../../Auth/Middleware/AuthMiddleware';

const router = express.Router();
const controller = new Controller();

router.get('/', authenUser.verifyAuth, (req, res) => res.redirect('/conversations'));

router.post('/conversations', (req, res) => {res.render('app/conversation/index')});

export default router;
