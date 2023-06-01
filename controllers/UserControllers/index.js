// controllers/users/index.js
const userModel = require('./../../models/Users')
const httpStatus = require('http-status')
const jsonUnequal = require('./../../shared/jsonUnequal')


const findAll = async (req, res) => {
  try {
    let users = await userModel.findAll()
    res.status(httpStatus.OK).json(users)
    return
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ success: true, response: error })
    return
  }
}

const findById = async (req, res) => {
  let id = req.params.id
  try {

    let users = await userModel.findById(id)

    res.status(httpStatus.OK).json(users)
    return
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, response: error })
    return
  }

}

const createUser = async (req, res) => {
  try {
    var user = await userModel.findEmail(req.body.email)
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: true, response: error })
    return
  }
  if (user.success === true) {
    if (user.response === undefined) {
      try {
        let insert = await userModel.create(req.body)
        return res.status(httpStatus.OK).json(insert)
      } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ success: false, response: error })
        return
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Email duplicado' })
      return

    }
  }
}

const update = async (req, res) => {
  try {
    var data = await userModel.findById(req.body.id)
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
  }
  if (data.success) {
    if (data.response != undefined) {
      let oldData = data.response
      let newData = req.body
      const listData = await jsonUnequal.compare(oldData, newData)
      if (listData.email) {
        // Check if email exist
        try {
          var emailExist = await userModel.findEmail(listData.email)

        } catch (error) {
          res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
        }


        if (emailExist.success && emailExist.response !== undefined) {
          res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Email duplicado' })
          return
        }
        if (!emailExist.success) {
          res.status(httpStatus.BAD_REQUEST).json({ success: false, response: emailExist.response })
          return
        }
      }
      
      if (Object.keys(listData).length === 0) {
        res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Nenhum registro alterado'})
        return
      }
      // INSERT REGISTER
      try {
        let insert = await userModel.update(req.body.id, listData)
        if (insert.response === 1) {
          res.status(httpStatus.OK).json({ success: true, response: 'Registro alterado'})
        }else{
          res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Nenhum registro alterado'})
        }
        return
      } catch (error) {
        res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
        return
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ success: true, response: 'Registro não encontrado' })
      return
    }
  } else {
    res.status(httpStatus.BAD_GATEWAY).json(data)
    return
  }
  
}

const destroy = async (req, res) => {
  try {
    const destroy = await userModel.destroy(req.params.id)
    if (destroy.response === 1) {
      res.status(httpStatus.OK).json({success: true, response: 'Registro deletado'})
    }else{
      res.status(httpStatus.OK).json({success: true, response: 'O parametro informado não foi localizado'})
    }
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error})
    
  }
}

module.exports = {
  findAll,
  createUser,
  findById,
  update,
  destroy
}
