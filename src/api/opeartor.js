import express from 'express'
import Users from '../models/userModel.js'
import { protect, admin } from '../auth/authMiddleware.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()

//*@desc fetch all Members
//*@Api Get /api/v1/members
//*@Access operator

router.get(
  '/members',
  protect,
  asyncHandler(async (req, res) => {
    const users = await Users.find({})
    const members = users.filter((data) => {
      return data.type === 'member'
    })
    if (members) {
      res.json(members)
    } else {
      res.status(404)
    }
  })
)

//*@desc delete Users
//*@Api delete /api/v1/member/:id
//*@Access Operator

router.delete(
  '/member/:id',
  protect,
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

//*@desc Fetch each member
//*@Api GET /api/v1/member/:id
//*@Access Operator

router.get(
  '/member/:id',
  protect,
  asyncHandler(async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      throw new Error('Users not found')
    }
  })
)

//*@desc Create Member
//*@Api POST /api/v1/createmember
//*@Access Operator

router.post(
  '/createmember',
  protect,
  asyncHandler(async (req, res) => {
    const { firstName, secondName, email, birthday, number, city, gender } =
      req.body
    const phonee = await Users.findOne({ number })

    if (phonee) {
      return res.status(400).json({ message: 'Phone is already exist' })
    }

    const user = new Users({
      firstName,
      secondName,
      email,
      birthday,
      pin: '1234',
      number,
      city,
      confirmation: true,
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

//*@desc Edit Member
//*@Api PUT /api/v1/editmember/:id
//*@Access Operator

router.put(
  '/editmember/:id',
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
      throw new Error('Users is not founded . ')
    }
  })
)

export default router
