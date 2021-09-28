import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    birthday: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true },
    pin: { type: String, required: true },
    img: { type: String },
    cardImage: { type: String },
    expireDate: { type: String },
    codee: { type: String },
    confirmation: { type: Boolean, required: true, default: false },
    type: {
      type: String,
      required: true,
      enum: ['user', 'operator', 'member'],
      default: 'user',
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.pin = await bcrypt.hash(this.pin, salt)
})

userSchema.methods.matchpin = async function matchpin(data) {
  return await bcrypt.compare(data, this.pin)
}

const User = mongoose.model('User', userSchema)

export default User
