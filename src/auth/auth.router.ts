import { Router } from 'express';

import { validate } from '@/common/middleware/validate';
import { signinValidation } from '@/auth/auth.validation';
import { getMeController, signinController } from '@/auth/auth.controller';
import { authMiddleware } from '@/common/middleware/auth';

const authRouter = Router();

authRouter.post('/signin', validate(signinValidation), signinController);
authRouter.get('/me', authMiddleware, getMeController);

export { authRouter };
