const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      // esse campo so vai existir do lado do  node
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    },
    {
      // hooks func do sequelize
      hooks: {
        // beforeSave disparado tanto antes da criação quando na edição
        beforeSave: async user => {
          // verifica se a instancia do user tem o valor de password,
          // informamos o password na hora da criação e edição
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  // .APP_SECRET segredo unico da aplicação, precisamos definir ele no .env
  // e no .env.test
  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET)
  }
  return User
}
