// controllers/users/index.js
const yup = require('yup')
const validaData = require('../../middleware/validationData')

const userSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required()
  // email: yup.string().email().required(),
  // Outros campos e regras de validação
})

const getUsers = async (req, res) => {
  res.send('Lista de usuários')
}

const createUser = async (req, res) => {
  console.log(req.body)
  res.send('Novo usuário criado')
}

module.exports = {
  getUsers,
  createUser: [validaData(userSchema,'body'), createUser]
}
