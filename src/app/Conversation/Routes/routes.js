import express from 'express';
import Controller from '../Controllers/conversation.controller';
import middleware from '../../Auth/Middleware/auth.middleware';

const router = express.Router();

router.get('/', Controller.redirectCoreView);

router.get('/conversations', middleware.renderVerifyAuth, Controller.conversation);

export default router;
