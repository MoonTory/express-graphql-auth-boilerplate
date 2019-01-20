import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';

import { UserModel } from '../../../db/models';
import { UserService } from '../../../services';

export default {
  Query: {
    users: (root, args, context, info) => {
      return UserModel.find({});
    },
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID!!!`);
      }

      return UserModel.findById(id);
    }
  },
  Mutation: {
    register: async (root, args, context, info) => {
      const result = await UserService.createUser(args.input);
      return {...result._doc, ...result._doc.profile };
    }
  }
}