const faker = require('faker')
const { factory } = require('factory-girl')
const { User } = require('../src/app/models')

// 1 param um nome, segundo o model, depois os nomes das vars
// mais opçoes para o faker na documentação
factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

module.exports = factory
