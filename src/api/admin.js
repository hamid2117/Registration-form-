import express from 'express'
import Users from '../models/userModel.js'
import { protect, admin } from '../auth/authMiddleware.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

router.get(
  '/image/:path',
  // protect,
  // admin,
  asyncHandler(async (req, res) => {
    console.log(req.params.path)
    res.download('./uploads/' + req.params.path)
  })
)

//*@desc fetch all Users
//*@Api Get /api/v1/users
//*@Access Admin

router.get(
  '/users',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await Users.find({})

    if (users) {
      res.json(users)
    } else {
      res.status(404)
    }
  })
)

//*@desc delete Users
//*@Api delete /api/v1/user/:id
//*@Access Admin

router.delete(
  '/user/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (user) {
      await user.remove()
      res.json({ message: 'Users is removed' })
    } else {
      res.status(404)
      throw new Error('Users is not found')
    }
  })
)

//*@desc Fetch each Users
//*@Api GET /api/v1/user/:id
//*@Access Admin

router.get(
  '/user/:id',
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      throw new Error('Users not found')
    }
  })
)

//*@desc Create User
//*@Api POST /api/v1/user
//*@Access Admin

router.post(
  '/user',
  asyncHandler(async (req, res) => {
    const {
      firstName,
      secondName,
      email,
      birthday,
      pin,
      number,
      city,
      gender,
    } = req.body
    const phonee = await Users.findOne({ number })

    if (phonee) {
      return res.status(400).json({ message: 'Phone is already exist' })
    }

    const user = new Users({
      firstName,
      secondName,
      email,
      birthday,
      pin,
      number,
      city,
      gender,
    })

    const createdUser = await user.save()
    if (createdUser) {
      res.status(201).json(createdUser)
    } else {
      throw new Error(error)
    }
  })
)

//*@desc Edit User
//*@Api PUT /api/v1/edituser/:id
//*@Access Admin

router.put(
  '/edituser/:id',
  protect,
  asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const user = await Users.findById(req.params.id)
    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.secondName = req.body.secondName || user.secondName
      user.email = req.body.email || user.email
      user.birthday = req.body.birthday || user.birthday
      user.pin = req.body.pin || user.pin
      user.number = req.body.number || user.number
      user.city = req.body.city || user.city
      user.gender = req.body.gender || user.gender

      const updatedUser = await user.save()
      res.status(200).json(updatedUser)
    } else {
      res.status(404)
      throw new Error('Users is not foundedd . ')
    }
  })
)

export default router
