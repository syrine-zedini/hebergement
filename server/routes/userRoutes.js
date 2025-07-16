import express from 'express';
import { getAllUsers ,getUserById ,deleteUser, updateUser} from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';

const userRouter = express.Router();

userRouter.post('/update-user/:id', updateUser);
userRouter.get('/get-all-users',userAuth,requireAdmin, getAllUsers);
userRouter.get('/get-user-by-id/:id', getUserById);
userRouter.delete('/delete-user/:id', deleteUser);  




export default userRouter;