import {Router} from 'express';

import controller from '../controllers/bookingController.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/bookings.schema.js';

const router = new Router();

router.get(
  '/',
  controller.getBookings,
);

router.get(
  '/:id',
  controller.getBooking,
);

router.post(
  '/',
  validation(schema.createBooking, 'body'),
  controller.createBooking,
);

router.patch(
  '/:id/cancel',
  controller.cancelBooking,
);

export default router;