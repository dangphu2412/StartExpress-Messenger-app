import express from 'express';
import Controller from '../Controllers/FriendController';

const router = express.Router();
const controller = new Controller();

router.post('/conversations', controller.callMethod('conversation'));

export default router;