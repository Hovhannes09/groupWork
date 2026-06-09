import { Router } from 'express'

import usersRouter from './auth.js'
import filmsRouter from './film.js'
import bookingRouter from './booking.js'
import adminRouter from './admin.js'
import commentsRouter from './comment.js'

const router = new Router()

router.get('/', (req, res) => {
	res.render('films')
})

router.use('/users', usersRouter)
router.use('/films', filmsRouter)
router.use('/bookings', bookingRouter)
router.use('/admin', adminRouter)
router.use('/comments', commentsRouter)

export default router
