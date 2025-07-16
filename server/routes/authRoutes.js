import express from 'express';
import { register,login , logout ,sendVerifyOtp , verifyEmail , isAuthenticated ,sendResetOtp ,resetPassword, handleGoogleAuth } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
import { preAuth } from '../middleware/preAuthMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup' ,register);
authRouter.post('/login', login);
authRouter.get('/logout',logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account',preAuth,  verifyEmail);
authRouter.post('/isAuth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/google', handleGoogleAuth);
authRouter.post('/reset-password', resetPassword);


export default authRouter;
