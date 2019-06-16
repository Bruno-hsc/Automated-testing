// função para deletar todos os dados do banco de dados depois que rodar um test
// importamos o sequelize da pasta models porq ele ja vem com as credencias
const { sequelize } = require('../../src/app/models')

// vamos exportar uma function porq sempre precisamos exportar uma function
// quando queremos execultar alguma coisa
module.exports = () => {
  // aqui percorremos todos os models que temos na aplicação
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      // force: true descarta relacionamentos e deleta tudo. destroy é uma function
      // assicrona
      return sequelize.models[key].destroy({ truncate: true, force: true })
    })
  )
}

// DELETE FROM
// TRUNCATE : limpa todos os dados da tabela
