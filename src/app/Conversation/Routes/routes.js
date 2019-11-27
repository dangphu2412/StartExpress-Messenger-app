import express from 'express';
import multer from 'multer';
import path from 'path';
import Controller from '../Controllers/ConversationController';
import authenUser from '../../Auth/Middleware/AuthMiddleware';

const router = express.Router();
const controller = new Controller();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/upload');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

router.get('/', authenUser.verifyAuth, controller.callMethod('redirectCoreView'));

router.get('/conversations', authenUser.verifyAuth, controller.callMethod('conversation'));

router.get('/conversations/t/:id', authenUser.verifyAuth, controller.callMethod('loadConversation'));

router.post('/upload-profile-image', controller.callMethod('uploadImgProfile'));

router.post('/createGroup', controller.callMethod('createGroup'));

router.post('/searchUser', controller.callMethod('searchUser'));

router.post('/sendMess', controller.callMethod('sendMess'));

router.post('/queryMess', controller.callMethod('queryMess'));

export default router;
