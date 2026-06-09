import {Router} from 'express';

import controller from '../controllers/commentController.js';

import admin from '../middlewares/admin.js';
import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/comment.schema.js';

const router = new Router();

router.post(
  '/',
  validation(schema.createComment, 'body'),
  controller.createComment,
);

router.get(
  '/film/:filmId',
  controller.getFilmComments,
);

router.put(
  '/:id',
  validation(schema.updateComment, 'body'),
  controller.updateComment,
);

router.delete(
  '/:id',
  controller.deleteComment,
);

router.patch(
  '/:id/status',
  admin,
  controller.updateStatus,
);

export default router;