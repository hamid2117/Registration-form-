import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { upload } from '../auth/uploadMiddleware.js'
import { sendSms } from '../auth/numbermsg.js'
import generateToken from '../auth/genrateToken.js'

const router = express.Router()

//*@desc To create a user
//*@Api POST /api/v1/register
//*@Access Public

router.post(
  '/register',
  sendSms,
  asyncHandler(async (req, res) => {
    const {
      firstName,
      secondName,
      email,
      city,
      birthday,
      number,
      cardImage,
      type,
      gender,
      pin,
      expireDate,
    } = req.body

    const alreadyExist = await User.findOne({ number })

    if (alreadyExist) {
      return res
        .status(409)
        .json({ status: 'error', error: 'number already in use' })
    } else {
      if (req.body.img) {
        const user = await User.create({
          firstName,
          secondName,
          number,
          birthday,
          cardImage,
          city,
          gender,
          email,
          expireDate,
          type,
          codee: req.codee,
          pin,
          img: req.body.img,
        })
        if (user) {
          res.status(201).json(user)
        }
      } else {
        const user = await User.create({
          firstName,
          secondName,
          number,
          cardImage,
          birthday,
          city,
          type,
          gender,
          email,
          codee: req.codee,
          expireDate,
          pin,
        })
        if (user) {
          res.status(201).json(user)
        }
      }
    }
    return res.status(500).json({
      status: 'error',
      error: 'Cannot register user at the moment',
    })
  })
)
router.post(
  '/verifycode',
  asyncHandler(async (req, res) => {
    const { code, number } = req.body
    const user = await User.findOne({ number })
    if (user.codee === code) {
      user.confirmation = true
      await user.save()
      res.status(200).json({
        number: user.number,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        token: generateToken(user._id),
      })
    } else {
      return res.status(403).json({ message: 'Wronge code!' })
    }
  })
)

//*@desc To upload an image
//*@Api PUT /api/v1/nationalidimg/:id   (User id )
//*@Access private (no token needed)

router.post('/upload', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

//*@desc To upload an cardimage
//*@Api PUT /api/v1/cardimage
//*@Access private (no token needed)

router.post('/cardimage', upload.single('card'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
