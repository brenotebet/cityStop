import express from 'express'
import { adminLogin, adminRegister } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/adminlogin', adminLogin)
adminRouter.post('/adminregister', adminRegister)

export default adminRouter