// como estamos em ambiente de teste nao precisa ser as informações certas
// como usando mailtrap etc
module.exports = {
  auth: {
    user: 'Bruno',
    pass: '123456'
  },
  port: 2525,
  host: 'smtp.mailtrap.io'
}
