import express from 'express';
import Controller from '../Controllers/FriendController';

const router = express.Router();
const controller = new Controller();

router.post('/add-friend', controller.callMethod('addFriend'));

router.post('/accept-friend', controller.callMethod('acceptFriendReq'));

router.post('/unfriend', controller.callMethod('unfriend'));

export default router;
