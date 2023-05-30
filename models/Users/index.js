// MODEL USERS
const connection = require('./../../database/connection')
const bcrypt = require('bcrypt')

class User {


  async findAll(){

    try {
      const users = await connection.select('*').from('users')
      return users
    } catch (error) {
      return false
    }

  }

  async create(data) {
    data
    try {
      var hash = await bcrypt.hash(data.password,10)
      data.password = hash
      await connection.insert(data).into('users')
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async findEmail(email) {
    try {
      var result = await connection.select('*').from('users').where({email: email})
      if (result.length > 0) {
        return true
      }else{
        return false
      }
    } catch (error) {
      return error
    }
  }
  async findById(id) {
    try {
      var result = await connection.select('*').from('users').where({id: id})
      return result[0]
    } catch (error) {
      return false
    }
  }
}

module.exports = new User()
