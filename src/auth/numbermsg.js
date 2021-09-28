const accountSid = 'AC720205802bd08f35fb73c9c078ba9abd'
const authToken = '20dacb8d1e0152a8c93f73728b124c45'
import twilio from 'twilio'

const sendSms = (req, res, next) => {
  const { number } = req.body
  const client = new twilio(accountSid, authToken)
  var a = Math.floor(Math.random() * 9999 + 999)
  a = String(a)
  a = a.substring(0, 4)
  let body = 'Your Code for Fintech is ' + a
  return client.messages
    .create({ body: '\n' + body, from: '+17067034795', to: number })
    .then((message) => {
      console.log(message)
      req.codee = a
      next()
    })
    .catch((e) => {
      console.log('Error... :', e)
      next(e)
    })
}

export { sendSms }
