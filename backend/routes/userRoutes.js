import express from 'express'
const router=express.Router()
import {authUser,
    registerUser,
    logoutUser,
    getUserprofile,
    updateUserprofile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/auth',authUser)
router.post('/',registerUser)
router.post('/logout',logoutUser)
router.route('/profile').get(protect,getUserprofile).put(protect,updateUserprofile)

export default router;