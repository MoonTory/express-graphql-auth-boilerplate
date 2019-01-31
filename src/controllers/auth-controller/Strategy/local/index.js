import passport from 'passport';

import { UserModel } from '../../../../db/models';

const LocalStrategy = require('passport-local').Strategy;

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
  // Find the user given the email
  const query = await UserModel.findOne({ "profile.email": email });

  // If not, handle it
  if (!query) {
    return done(null, false);
  }

  const isMatch = await query.isValidPassword(password);

  // If not, handle it
  if (!isMatch) {
    return done(null, false);
  }

  // Otherwise, return the user
  done(null, query);
  } catch(error) {
    done(error, false);
  }
}));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  done(null, user.id); 
 // where is this user.id going? Are we supposed to access this anywhere?
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function(err, user) {
      done(err, user);
  });
});