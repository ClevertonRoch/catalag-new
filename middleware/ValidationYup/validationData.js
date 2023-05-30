// middleware/validationData.js
const httpStatus = require('http-status')
const validationData = (schema, dataLocation) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req[dataLocation], { abortEarly: false })
      // Se a validação for bem-sucedida, chame o próximo middleware ou o controller
      next()
    } catch (error) {

      const errorYup = error.inner.map((err) =>({
        field: err.path,
        message: err.message
      }))
      res.status(httpStatus.BAD_REQUEST).json({ errors: errorYup })
    }
  }
}

module.exports = validationData
