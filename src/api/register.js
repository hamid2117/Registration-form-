import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import path from 'path'
import multer from 'multer'

const router = express.Router()

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const {
      firstName,
      secondName,
      email,
      city,
      birthday,
      number,
      gender,
      pin,
    } = req.body

    const alreadyExist = await User.findOne({ email })

    if (alreadyExist) {
      return res
        .status(409)
        .json({ status: 'error', error: 'email already in use' })
    } else {
      const user = await User.create({
        firstName,
        secondName,
        number,
        birthday,
        city,
        gender,
        email,
        pin,
      })
      if (user) {
        res.status(201).json(user)
      }
    }
    return res.status(500).json({
      status: 'error',
      error: 'Cannot register user at the moment',
    })
  })
)
const Storage = multer.diskStorage({
  destination: './public',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: Storage,
}).single('image') //name of input (frontend)

router.put(
  '/nationalidimg/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err)
          res.status(380).json(err)
        } else {
          user.img = req.file.path
          await user.save()
          res.status(205).json(user)
        }
      })
    } else {
      res.status(404).send({ message: 'User does not exist . ' })
    }
  })
)

export default router
