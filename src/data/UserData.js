import bcrypt from 'bcryptjs'

const user = [
  {
    firstName: 'Muhammad',
    secondName: 'Usama',
    email: 'MuhammadUsama@gmail.com',
    city: 'Islamabad',
    birthday: '12/4/1997',
    number: '+9234234324',
    gender: 'Male',
    expireDate: '2/2/2024',
    pin: bcrypt.hashSync('1234', 10),
  },
  {
    firstName: 'Hamid',
    secondName: 'Mehmood',
    email: 'hamid@gmail.com',
    birthday: '12/4/2000',
    number: '+9231232231',
    city: 'Lahore',
    gender: 'Male',
    expireDate: '2/2/2024',
    pin: bcrypt.hashSync('1234', 10),
  },
]

export default user
