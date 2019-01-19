/**
 * Node_Module dependencies.
 */
import express, { urlencoded, json } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

/**
 * Local_Module dependencies.
 */
import { connectMongoDb } from '../db/mongo';
import { errorCatcher, errorHandler } from '../utils/middlewares';
import { apollo } from '../graphql';

/**
 * Configs.
 */
import { NODE_ENV } from '../config';

/**
 * Initializing Express App.
 */
const app = express();

/**
 * Express Middleware Stack.
 */
app.use(helmet());
app.use(cors());
app.use(morgan(NODE_ENV));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Apollo GraphQl Middleware.
 */
apollo.applyMiddleware({ app });

/**
 * Connect to MongoDb.
 */
connectMongoDb();

/**
 * Express Error handling.
 */
app.use(errorCatcher);
app.use(errorHandler);

export default app;