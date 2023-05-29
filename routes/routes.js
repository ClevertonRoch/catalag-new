// routes/index.js
const express = require('express')
const usersRoutes = require('./users')

const router = express.Router()

router.use('/', usersRoutes)


module.exports = router