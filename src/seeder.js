import users from './data/UserData.js'
// Models
import User from './models/userModel.js'
// other
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
connectDB()

// Don't do that in Production it will replace all data

const importData = async () => {
  try {
    await Product.deleteMany()
    await User.deleteMany()
    await Customer.deleteMany()

    const createdUsers = await User.insertMany(users)

    console.log(createdUsers)
    console.log('data Inserted !')
    process.exit()
  } catch (error) {
    console.error(`Your Error is : ${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    console.log('data is destroyed ')
    process.exit(0)
  } catch (error) {
    console.error(`Error of destroy Data is : ${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
