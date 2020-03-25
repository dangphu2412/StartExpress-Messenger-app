import express from 'express';
import Controller from '../Controllers/friend.controller';

const router = express.Router();

router.post('/api/friends', Controller.addFriend);

export default router;
