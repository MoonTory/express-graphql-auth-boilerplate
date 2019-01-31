import { UserService } from '../../services';
import passport from 'passport';
require('./Strategy');

export default {
  
  jwtAuth: passport.authenticate('jwt', { session: true }),

  localAuth: passport.authenticate('local', { session: true }),

  googleAuth: passport.authenticate('googleToken', { session: true }),


  // Login Controler Middleware
  login: async (req, res, next) => {
    if (!req.user.confirmed) {
      res.status(401).json({
        error: {
          message: 'You must first confirm your email address!!'
        }
      });
    } else {
      const token = await UserService.signToken(req.user);

      res.status(200).json({
        payload: {
          message: `Users-Controller handling login POST request to ${req.baseUrl}`,
          token: token,
        }
      });
    }
  },

  // Google OAuth Controller Middleware
  googleLogin: async (req, res, next) => {
    const token = await UserService.signToken(req.user);

    res.status(200).json({
      payload: {
        message: `Users-Controller handling login POST request to ${req.baseUrl}`,
        token: token,
      }
    });
  },

  handleConfirmEmailRoute: (redis) => {
    return async (req, res, next) => {
      try {
        const { id } = req.params;
        const userId = await redis.get(id);
        console.log('userid from redis', userId);
    
        await UserService.confirmUser(userId);

        res.status(200).json({
          payload: {
            message: `Users-Controller handling CONFIRMATION ROUTE GET request to ${req.baseUrl}`,
          }
        });
      } catch (error) {
        throw error;
      }

    }
  },

}