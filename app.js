import 'dotenv/config';
import morgan from 'morgan';
import path from 'path';
import { createServer } from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';

import './models/index.js';
import './migrate.js';

import errorHandler from './middlewares/errorHandler.js';
import sessionMiddleware from './config/session.js';

import routes from './routes/index.js';

const app = express();

const { PORT, COOKIE_SECRET } = process.env;

app.set('views', path.resolve('views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('public')));
app.use(cookieParser(COOKIE_SECRET));

app.use(routes);

app.use(errorHandler.notFount);
app.use(errorHandler.errors);

const server = createServer(app);

server.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
});
