// verifica se esta em teste ou nao
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  // essa conf vai ser ultilizada quando o DB for sqlite, onde vai
  // ser salvo
  storage: './__tests__/database.sqlite',
  logging: false,
  operationsAliases: false,
  define: {
    // para vir os campos updatedat e createdat em todas as tabelas
    timestamps: true,
    // as tabelas em caixa baixa no lugar de camecase
    underscored: true,
    // para aplicar as configs do underscored acima
    underscoredAll: true
  }
}
