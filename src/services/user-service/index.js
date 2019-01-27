import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { UserModel } from '../../db/models';
import { tryFunctionOrLogError } from 'apollo-utilities';

export default {

  createUser: async payload => {
    try {

      const { username, email, password } = payload;

      // Checking if there is already a registered username / email 
      const emailCheck = await UserModel.findOne({ "profile.email": email });
      if (emailCheck) {
        // Check if user doesn't have a password 
        if (emailCheck.profile.password === undefined) {
          console.log('User doesnt have a password registered');
          // return await PassportService.updateGoogleWithPassword(payload);
        } else { return undefined; }

      } else {
        // Create a new user model using payload
        const newUser = new UserModel({ 
          profile: {
            method: 'local',
            username, 
            email, 
            password
          } 
        });

        // Save new user model into DB & return results
        return await newUser.save();
      }

    } catch (error) {
      throw error;
    }
  },

  signToken: async user => {
    try {
      // Await & return signed JSON web token
      return await jwt.sign({
        iss: 'TsukiSystems',
        sub: user.id,
        iat: new Date().getTime(), // Current Date
        exp: new Date().setDate(new Date().getDate() + 1) // Current Date + 1 Day
      }, JWT_SECRET);

    } catch (error) {
      throw error;
    }
  },

  confirmUser: async (userId) => {
    try {
      await UserModel.updateOne({"_id": userId}, { confirmed: true }, () => {
        console.log('Updating confirmation to true on user' + userId);
      })
    } catch (error) {
      throw error;
    }
  }

};