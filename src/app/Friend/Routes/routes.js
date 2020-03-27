import express from 'express';
import Controller from '../Controllers/friend.controller';
import validate from '../Middlewares/friend.middleware';

const router = express.Router();

router.post('/api/friends', validate.verifyAuth, Controller.addFriend);

export default router;
