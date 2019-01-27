import passport from 'passport';

import { UserModel } from '../../../../db/models';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../../../config';
import { AuthService } from '../../../../services';

const GoogleTokenStrategy = require('passport-google-plus-token');

// GOOGLE OAUTH STRATEGY
passport.use('googleToken', new GoogleTokenStrategy({
  authorizationURL: '',
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check DB if Google Email already exists
    const matchGoogleEmail = await UserModel.findOne({ "profile.email": profile.emails[0].value });
    if (matchGoogleEmail) {
      if (matchGoogleEmail.profile.googleId === undefined) {
        const updatedUser = await AuthService.googleOAuthUpdate(profile);
        return done(null,  updatedUser);
      } else { return done(null, matchGoogleEmail); } 
    }

    // Create new User with GoogleId
    const newGoogleUser =  await AuthService.googleOAuthCreate(profile);
    return done(null, newGoogleUser);

  } catch (error) {
    done(error, false, error.message);
  }
}));