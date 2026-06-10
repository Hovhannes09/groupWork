import { Router } from 'express'

import controller from '../controllers/filmController.js'
import validation from '../middlewares/validation.js'
import schema from '../middlewares/schemas/film.schema.js'
import admin from '../middlewares/admin.js'
import upload from '../middlewares/upload.js'

const router = new Router()

router.get('/', controller.getFilms)

router.get('/:id', controller.getFilm)

router.post(
	'/',
	admin,
	upload.single('image'),
	validation(schema.createFilm, 'body'),
	controller.createFilm
)

router.put(
	'/:id',
	admin,
	upload.single('image'),
	validation(schema.updateFilm, 'body'),
	controller.updateFilm
)

router.delete('/:id', admin, controller.deleteFilm)

export default router
