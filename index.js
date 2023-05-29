const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes  = require('./routes/routes')



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', routes)

app.listen(8080,()=> console.log('server running!'))
