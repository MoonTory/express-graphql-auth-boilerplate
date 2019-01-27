import joi from 'joi';
import Schemas from './Schemas';

export default {

  validateInput: async (args, schema) => {
    await joi.validate(args, schema, { abortEarly: false });
  },

  Schemas,

};