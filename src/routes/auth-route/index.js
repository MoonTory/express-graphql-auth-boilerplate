import { Router } from 'express';
import { AuthController } from '../../controllers'
import { joiReqMiddlware } from '../../utils/middlewares';

const { validateBody, Schemas } = joiReqMiddlware;
const router = Router();

router.route('/login')
  .post(validateBody(Schemas.authSchema), AuthController.localAuth, AuthController.login);

router.route('/oauth/google')
  .post(validateBody(Schemas.googleAuthSchema), AuthController.googleAuth, AuthController.googleLogin);
  
export default router;