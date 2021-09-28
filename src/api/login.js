import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../auth/genrateToken.js'

//*@desc login the user
//*@Api POST /api/v1/login
//*@Access Public

const router = express.Router()

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { number, pin } = req.body
    const user = await User.findOne({ number })

    if (!user) return res.status(400).json({ message: 'User is not found !' })
    if (!user.confirmation) {
      return res.status(490).json({ message: 'please confirm you Number  !' })
    }

    if (user && pin && (await user.matchpin(pin))) {
      res.json({
        number: user.number,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        token: generateToken(user._id),
      })
    } else {
      return res.status(403).json({ message: 'Wronge pin!' })
    }
  })
)

export default router
