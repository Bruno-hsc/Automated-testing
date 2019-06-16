const { User } = require('../models')

const Mail = require('../services/MailService')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    await Mail.send({
      from: 'Bruno Henrique <brunohenriquescosta@hotmail.com>',
      to: `${user.name}<${user.email}>`,
      subject: 'New access in your account',
      text: 'Hi dev'
    })

    return res.json({
      token: await user.generateToken()
    })
  }
}

module.exports = new SessionController()
