import { UserModel } from '../../db/models';

export default {
  googleOAuthUpdate: async profile => {
    try {
      const updatedUser = await UserModel.findOneAndUpdate({ "profile.email": profile.emails[0].value }, { $set: { "profile.googleId": profile.id }});
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  updateGoogleWithPassword: async profile => {
    try {
      // Updates a Google Created Account with no Password
      const updatedUser = new UserModel();
      profile.password = await updatedUser.hashPassword(payload.password);
      updatedUser = await UserModel.findOneAndUpdate({ "profile.email": profile.email }, 
        { $set: { "profile.username": profile.username, "profile.password": profile.password }});

      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  googleOAuthCreate: async profile => {
    try {
      // Create new User with GoogleId
      const newGoogleUser = new UserModel({
        profile: {
          method: 'google',
          username: profile.name.givenName,
          email: profile.emails[0].value,
          googleId: profile.id
        }
      });

      return await newGoogleUser.save();
    } catch (error) {
      throw error;
    }
  },
};