// routes/users/index.js
const express = require('express')

const userSchema = require('./../../middleware/ValidationYup/SchemaYup/userSchema')
const validaData = require('../../middleware/ValidationYup/validationData')
const userController = require('../../controllers/UserControllers')

const router = express.Router()


router.get('/users', userController.findAll)
router.get('/users/:id',validaData(userSchema.idUserSchema, 'params')  ,userController.findById)
router.post('/user', validaData(userSchema.createUserSchema,'body'), userController.createUser)

module.exports = router
