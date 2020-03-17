import express from 'express';
import Controller from '../Controllers/ConversationController';

const router = express.Router();
const controller = new Controller();

router.get('/', controller.callMethod('redirectCoreView'));

router.get('/conversations', controller.callMethod('conversation'));

export default router;
