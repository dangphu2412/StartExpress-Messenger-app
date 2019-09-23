import express from 'express';
import authRouter from '../app/Auth/Routes/routes';

const router = express.Router();

router.use(authRouter);

router.get('/', (req, res) => res.redirect('/conversations'));

router.get('/conversations', (req, res) => res.render('app/conversation/index'));

export default router;
