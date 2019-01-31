/**
 * Node_Module dependencies.
 */
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';

/**
 * Local_Module dependencies.
 */
import { UserModel } from '../../../db/models';
import { UserService, EmailService } from '../../../services';
import { joiValidator, isValidMongoId } from '../../helpers';

const { validateInput, Schemas } = joiValidator;

export default {
  Query: {
    // @Query: Get all Users from DB.
    users: (root, args, { req }, info) => {

      if ( isValidMongoId(req.user) ) {
        return [];
      }

      return UserModel.find({});
    },
    
    //@Query: Get specidifc user using specified ID.
    user: (root, { id }, context, info) => {
      if ( isValidMongoId(id) ) {
        throw new UserInputError(`${id} is not a valid user ID!!!`);
      }
      return UserModel.findById(id);
    }
  },

  Mutation: {

    // @Mutation: Register a new user in DB 
    register: async (root, args, { url, redis }, info) => {

      await validateInput(args.input, Schemas.registerSchema);

      const result = await UserService.createUser(args.input);

      const link = await EmailService.genConfirmationEmailLink(url, result.id, redis);

      console.log('link', link);

      return result;
    },

    // @Mutation: Login user using provided credentials
    login: async (root, args, { req, res, next }, info) => {
      
    },
  }
}