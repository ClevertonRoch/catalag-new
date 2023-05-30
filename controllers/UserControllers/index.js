// controllers/users/index.js
const userModel = require('./../../models/Users')

const httpStatus = require('http-status')

const getUsers = async (req, res) => {
  res.send('Lista de usuários')
}

const createUser = async (req, res) => {
  try {
    var user = await userModel.findEmail(req.body.email)
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({erro: true, message: error})
    return
  }
  
  if (user === false) {
    try {
      await userModel.create(req.body)
      res.status(httpStatus.OK).json({message: 'success'})
      return
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json({erro: true, message: error})
      return
    }
    
  }else if(user === true){
    res.status(httpStatus.BAD_REQUEST).json({erro: true, message: 'E-mail invalido, '})
    return
  }else{
    res.status(httpStatus.BAD_GATEWAY).json({erro: true, message: user})
    return
  }

}

module.exports = {
  getUsers,
  createUser
}
