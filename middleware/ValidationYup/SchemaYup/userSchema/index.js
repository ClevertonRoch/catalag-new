const yup = require('yup')

const newUserSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  role: yup.number().required()
})

const editUserSchema = yup.object().shape({
  id: yup.number().required().integer(),
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
  role: yup.number().required()
})
const idUserSchema = yup.object().shape({
  id: yup.number().required().integer()
})

module.exports = {
  newUserSchema,
  editUserSchema,
  idUserSchema
}