// MODEL USERS
const connection = require('./../../database/connection')
const bcrypt = require('bcrypt')

class User {


  async findAll() {

    try {
      const users = await connection.select('*').from('users')
      return { success: true, response: users }
    } catch (error) {
      return { success: false, response: error }
    }

  }

  async create(data) {

    try {
      let hash = await bcrypt.hash(data.password, 10)
      data.password = hash
      await connection.insert(data).into('users')
      return { success: true, response: 'Registro realizado' }
    } catch (error) {
      return { success: false, response: error }
    }
  }

  async findEmail(email) {
    try {
      let result = await connection.select('*').first().from('users').where({ email: email })
      return { success: true, response: result }

    } catch (error) {
      return { success: false, response: error }
    }
  }
  async findById(id) {
    try {
      let result = await connection.select('*').first().from('users').where({ id: id })
      return { success: true, response: result }
    } catch (error) {

      return { success: false, response: error }
    }

  }

  async update(id, listData) {
    try {
      let result = await connection.update(listData).table('users').where({ id: id })
      return { success: true, response: result }

    } catch (error) {
      return { success: false, response: error }
    }
  }
  // DELETE

  async destroy(id) {
    try {
      const result = await connection.delete().table('users').where({id: id})
      return { success: true, response: result}
    } catch (error) {
      return { success: false, response: error}
    }
  }


}

module.exports = new User()
