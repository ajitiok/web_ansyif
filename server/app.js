require("dotenv").config()
const cors = require('cors')
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routers/index')
const errorHandlers = require("./middlewares/errorHandler")




app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)
app.use(errorHandlers)

app.listen(PORT, _=> console.log('CONNECTED WITH PORT', PORT))