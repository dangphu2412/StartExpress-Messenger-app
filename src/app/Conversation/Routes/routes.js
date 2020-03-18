import express from 'express';
import Controller from '../Controllers/conversation.controller';
import middleware from '../../Auth/Middleware/auth.middleware';

const router = express.Router();
const controller = new Controller();

router.get('/', controller.callMethod('redirectCoreView'));

router.get('/conversations', middleware.verifyAuth, controller.callMethod('conversation'));

export default router;
