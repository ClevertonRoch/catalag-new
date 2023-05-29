// controllers/users/index.js
const getUsers = async (req, res) => {
  res.send('Lista de usuários')
}

const createUser = async (req, res) => {
  console.log(req.body)
  res.send('Novo usuário criado')
}

module.exports = {
  getUsers,
  createUser
}
