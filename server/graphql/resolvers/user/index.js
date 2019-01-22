/**
 * Node_Module dependencies.
 */
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';

/**
 * Local_Module dependencies.
 */
import { UserModel } from '../../../db/models';
import { UserService } from '../../../services';
import { joiValidator } from '../../../utils';

const { validateInput, Schemas } = joiValidator;

export default {
  Query: {
    // @Query: Get all Users from DB.
    users: (root, args, context, info) => {
      return UserModel.find({});
    },
    
    //@Query: Get specidifc user using specified ID.
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID!!!`);
      }
      return UserModel.findById(id);
    }
  },

  Mutation: {

    // @Mutation: Register a new user in DB 
    register: async (root, args, context, info) => {

      await validateInput(args.input, Schemas.registerSchema);

      const result = await UserService.createUser(args.input);
      return {...result._doc, ...result._doc.profile };
    },

    // @Mutation: Login user using provided credentials
    login: async (root, args, { req, res, next }, info) => {
      
    },
  }
}