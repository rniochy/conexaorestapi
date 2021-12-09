import express from 'express'
import Task from '../model/task_model.js'
import authorization from '../middleware/auth.js'


const  routerTask= express.Router()
routerTask.use(authorization);


routerTask.post('/register', async (req, res)=>{
    const {email} = req.body
    try {
        const {title, comleted} = req.body 
        const objTask = new Task({title, description});
        await objTask.save();

        return res.send({
            msg: "Usuário criado",
            task: objTask                  
       })
    } catch(err){
        return res.status(400).send({msgErr: "Não foi possível criar projecto."})
    }
})

routerTask.get('/', async  (req, res)=>{

    try {
           const task =  await Task.findOne({}).populate('AssignedTo');
           return res.send({task});
    } catch(err){
       return res.status(401).send({msgErr: "Não foi possível retornar projecto."})   
    }  
})

routerTask.delete('/delete/:title', async  (req, res)=>{
           const title = req.params.title

   try {
          const task =  await Task.findOne({title});

          if(task){
           await Task.deleteOne({title});
           return res.send({task});

          } else {
               return res.send({msgErr: "Projeto não encontrado!"});
          }
          
   } catch(err){
      return res.status(401).send({msgErr: "Não foi possível retornar projecto."})   
   }  
})

export default routerTask