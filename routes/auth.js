import {Router} from 'express';

import controller from '../controllers/authController.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/users.schema.js';

const router = new Router();

router.post(
  '/register',
  validation(schema.register, 'body'),
  controller.register,
);

router.post(
  '/login',
  validation(schema.login, 'body'),
  controller.login,
);

router.post(
  '/logout',
  controller.logout,
);

router.post(
  '/reset-password',
  validation(schema.resetPassword, 'body'),
  controller.resetPassword,
);

router.get(
  '/me',
  controller.me,
);

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

export default router;