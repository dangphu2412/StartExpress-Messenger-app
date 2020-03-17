import express from 'express';
import conversationRouter from '../app/Conversation/Routes/routes';
import authRouter from '../app/Auth/Routes/routes';

const router = express.Router();

router.use(conversationRouter);

router.use(authRouter);

export default router;
