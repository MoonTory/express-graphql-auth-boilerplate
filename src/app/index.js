/**
 * Node_Module dependencies.
 */
import express, { urlencoded, json } from 'express';
import Redis from 'ioredis';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';

/**
 * Local_Module dependencies.
 */
import { AuthController } from '../controllers';
import { connectMongoDb } from '../db/mongo';
import { errorCatcher, errorHandler } from '../utils';
import { typeDefs, resolvers } from '../graphql';
import routes from '../routes';

/**
 * Configs.
 */
import { 
  NODE_ENV, SESSION_NAME, SESSION_SECRET, SESSION_LIFETIME,
  REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_URL
} from '../config';

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
 * Connect to MongoDb.
 */
connectMongoDb();

/**
 * Ioredis Client.
 */
const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
});

/**
 * Create Redis Store.
 */
const RedisStore = connectRedis(session);

const store = new RedisStore({
  client: redis,
  host: REDIS_HOST,
  port: REDIS_PORT,
  pass: REDIS_PASSWORD
});

/**
 * Express Sessions.
 */
app.use(session({
  store,
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: SESSION_LIFETIME,
    sameSite: true,
    secure: NODE_ENV
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.use('/confirm/:id', AuthController.handleConfirmEmailRoute(redis));

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: true }, (err, user, info) => {
    if (user) {
      req.user = user.id;
    }

    next()
  })(req, res, next)
});

/**
 * Apollo-Server-Express GraphQl Middleware.
 */
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({req, res}) => ({req, res, redis, url: req.protocol + '://' + req.get('host'),}),
});

apollo.applyMiddleware({ app });

/**
 * Express Error handling.
 */
app.use(errorCatcher);
app.use(errorHandler);

export {
  app, apollo
};