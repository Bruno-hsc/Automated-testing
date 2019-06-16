const jwt = require('jsonwebtoken')
// transforma uma function que ultiliza o padrap de callback em promise
const { promisify } = require('util')

// OBS: function async porq vamos ultilizar depois
// vamos usar o next para chamar a proxima rota caso o middleware passe
module.exports = async (req, res, next) => {
  // pegamos o header de autorização
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' })
  }

  // pegamos o token do header, ele vem nesse formato : Bearer 123123
  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

    // se der certo adiciona uma informação que é o id do user logado dentro
    // da requisição baseado do que esta dentro do token, todas as proximas rotas
    // terao acesso a essa inf
    req.userId = decoded.id

    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}
