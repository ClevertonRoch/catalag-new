const { Router } = require('express')
const router = Router()


router.get('/',(req, res) =>{
  res.send('Rota ok!')
})

module.exports = router