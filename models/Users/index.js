const db = require('./../../database/connection')
// const httpStatus = require('http-status')
const bcrypt = require('bcrypt')

class User {
  async create(data) {
    data
    try {
      var hash = await bcrypt.hash(data.password,10)
      data.password = hash
      await db.insert(data).into('users')
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async findEmail(email) {
    try {
      var result = await db.select('*').from('users').where({email: email})
      if (result.length > 0) {
        return true
      }else{
        return false
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = new User()
