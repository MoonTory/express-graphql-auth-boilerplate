import joi from 'joi';

export default {

    registerSchema: joi.object().keys({
      username: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
    authSchema: joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }),
    googleAuthSchema: joi.object().keys({
      access_token: joi.string().required()
    }),


}