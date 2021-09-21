import express from 'express'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import { upload } from '../auth/uploadMiddleware.js'
const router = express.Router()

//*@desc To create a user
//*@Api POST /api/v1/register
//*@Access Public

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
      cardImage,
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
          gender,
          email,
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
