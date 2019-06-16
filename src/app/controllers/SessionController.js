const { User } = require('../models')

const Mail = require('../services/MailService')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    // procurando um user pelo email
    const user = await User.findOne({ where: { email } })

    // se o user nao existir
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // se existir e a senha nao bater, OBS: outro () para colocar o await
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    // antes de logar envia o email
    await Mail.send({
      from: 'Bruno Henrique <brunohenriquescosta@hotmail.com>',
      to: `${user.name}<${user.email}>`,
      subject: 'New access in your account',
      text: 'Hi dev'
    })

    // retorna o token
    return res.json({
      token: await user.generateToken()
    })
  }
}

module.exports = new SessionController()
