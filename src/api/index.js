import express from 'express'
import registerApi from './register.js'
import loginApi from './login.js'
import updateProfile from './updateProfile.js'
const router = express.Router()

router.use(registerApi)
router.use(loginApi)
router.use(updateProfile)
export default router
