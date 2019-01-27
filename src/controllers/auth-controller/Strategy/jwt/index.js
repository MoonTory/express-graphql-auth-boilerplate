import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';

import { JWT_SECRET } from '../../../../config';
import { UserModel } from '../../../../db/models';

const JwtStrategy = require('passport-jwt').Strategy;

// JWT TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const query = await UserModel.findById(payload.sub);

    // If user doesn't exist, handle it
    if (!query) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, query);
  } catch (error) {
    done(error, false);
  }
}));