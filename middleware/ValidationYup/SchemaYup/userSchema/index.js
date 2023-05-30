const yup = require('yup')

const createUserSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  role: yup.number().required()
})

const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string().min(6),
})
const idUserSchema = yup.object().shape({
  id: yup.number().required().integer()
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  idUserSchema
}