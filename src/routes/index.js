import express from 'express';
import knex from '../database/connection';
import verify from '../app/Auth/Middleware/AuthMiddleware';

const router = express.Router();

router.route('/login')
  .get((req, res) => res.render('app/login'))
  .post((req, res) => res.redirect('/conversations'));

router.post('/authenEmail', async (req, res) => {
    const data = req.body;
    const user = knex('users').select('email');
    if (await user.where({ email: data.email, password: data.password }).first()) {
      req.session.user = data;
      req.session.save();
      data.href = '/';
      return res.json(data);
    }
    return res.json('error');
});

router.route('/phone-register')
  .get((req, res) => res.render('app/login-phone-number'))
  .post(async (req, res) => {
      const data = req.body;
      const userCheck = knex('users').where({ phone_number: data.phoneNumber }).first();
      if (await userCheck) {
          res.json(data);
      }
      await knex('users').insert(data);
      return res.json();
  });


router.route('/register') 
  .get((req, res) => res.render('app/register'))
  .post(async (req, res) => {
    const data = req.body;
    await knex('users').insert(data)
        .then(() => {
          console.log('success');       
        })
        .catch((error) => {
          console.log(error);
        });
  });

router.get('/reset-password', (req, res) => res.render('app/reset-password'));

router.get('/', (req, res) => res.redirect('/conversations'));

router.get('/conversations', verify.verifyAuth, (req, res) => {
  res.render('app/conversation/index');
});

export default router;
