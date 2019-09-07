import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => res.render('app/login'));

router.get('/register', (req, res) => res.render('app/register'));

router.get('/reset-password', (req, res) => res.render('app/reset-password'));

router.get('/', (req, res) => res.redirect('/conversations'));

router.get('/conversations', (req, res) => res.render('app/conversation/index'));

export default router;
