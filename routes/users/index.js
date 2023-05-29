// routes/users/index.js
const express = require('express')
const userController = require('../../controllers/Users')

const router = express.Router()

router.get('/', userController.getUsers)
router.post('/', userController.createUser)

module.exports = router
