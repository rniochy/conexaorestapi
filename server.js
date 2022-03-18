import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routerUser  from './controller/usuario.js'
import routerProject from './controller/projecto.js'
import routerTask from './controller/tarefa.js'
import './database/bdConection.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.use('/user', routerUser);
app.use('/project', routerProject);
app.use('/task', routerTask);

app.listen(port, ()=>{
       console.log("SERVER RUNNING ...")
})