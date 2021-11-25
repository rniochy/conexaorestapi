import express from 'express'
import cors from 'cors'
import './database/bdConection.js'
import router  from './route/usuario.js'

const app = express()
const port = process.PORT || 3000

app.use(cors())

app.use(express.json())

app.use('/user', router)

app.listen(port, ()=>{
       console.log("SERVER RUNNING ...")
})