import joi from 'joi';
import Schemas from './Schemas';

export default {

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = joi.validate(req.body, schema);

      if (result.error) {
        next(result.error);
      }

      if (!req.value) { req.value = {}; }
      
      req.value['body'] = result.value;
      next();
    }
  },

  Schemas,

};