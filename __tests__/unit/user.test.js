// aqui será um teste unitario, nao vai precisar acessar bando de dados
// nem api. Aqui vamos testar a senha do usuario
const bcrypt = require('bcryptjs')

const factory = require('../factories')
// const { User } = require('../../src/app/models')

// todo teste que vai rabalhar com BD precisamos limpar o model
const truncate = require('../utils/truncate')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  // assim que o user for criado a senha dele deve ser cryptografada
  // passamos passowrd, porq passamos a senha e esperamos que ele se encriptado
  it('Should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    // compara as senhas
    const compareHash = await bcrypt.compare('123456', user.password_hash)

    expect(compareHash).toBe(true)
  })
})
