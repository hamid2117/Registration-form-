import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../auth/genrateToken.js'
import { protect } from './../auth/authMiddleware.js'

//*@desc update profile
//*@Api PUT /api/v1/profile
//*@Access Private

const router = express.Router()

router.get(
  '/profile',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)
router.put(
  '/profile',
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.secondName = req.body.secondName || user.secondName
      user.email = req.body.email || user.email
      user.number = req.body.number || user.number
      user.city = req.body.city || user.city
      user.gender = req.body.gender || user.gender
      user.birthday = req.body.birthday || user.birthday
      user.expireDate = req.body.expireDate || user.expireDate
      user.img = req.body.img || user.img
      user.pin = req.body.pin || user.pin
      const updatedUser = await user.save()

      res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        secondName: updatedUser.secondName,
        email: updatedUser.email,
        number: updatedUser.number,
        city: updatedUser.city,
        gender: updatedUser.gender,
        expireDate: updatedUser.expireDate,
        img: updatedUser.img,
        token: generateToken(user._id),
      })
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  })
)

export default router
