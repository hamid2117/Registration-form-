import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    birthday: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true },
    pin: { type: Number, required: true },
    img: { type: String },
    expireDate: { type: String },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
