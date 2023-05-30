// routes/index.js
const express = require('express')
// eslint-disable-next-line no-unused-vars
const traslation = require('./../middleware/ValidationYup/TranslationsYup')
const usersRoutes = require('./users')

const router = express.Router()

router.use('/', usersRoutes)


module.exports = router