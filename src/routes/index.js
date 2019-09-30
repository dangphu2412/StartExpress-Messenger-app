import express from 'express';
import conversationRouter from '../app/Conversation/Routes/routes';
import authRouter from '../app/Auth/Routes/routes';
import friendRouter from '../app/Friend/Routes/routes';

const router = express.Router();

router.use(conversationRouter);

router.use(authRouter);

router.use(friendRouter);

export default router;
