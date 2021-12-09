import express from 'express'
import Project from '../model/project_model.js'
import authorization from '../middleware/auth.js'

const  routerProject = express.Router()

routerProject.use(authorization)

routerProject.post('/register', async (req, res)=>{

    try {
        const objProject = new Project({... req.body, user: req.userId});
        await objProject.save();

        return res.send({
            msg: "Projecto criado",
            project: objProject                   
       })
    } catch(err){
        return res.status(400).send({msgErr: "Não foi possível criar projecto."})
    }
})

routerProject.get('/', async  (req, res)=>{

     try {
            const projeto =  await Project.findOne({}).populate('user');
            return res.send({projeto});
     } catch(err){
        return res.status(401).send({msgErr: "Não foi possível retornar projecto."})   
     }  
})

routerProject.delete('/delete/:title', async  (req, res)=>{
            const title = req.params.title

    try {
           const projeto =  await Project.findOne({title});

           if(projeto){
            await Project.deleteOne({title});
            return res.send({projeto});

           } else {
                return res.send({msgErr: "Projeto não encontrado!"});
           }
           
    } catch(err){
       return res.status(401).send({msgErr: "Não foi possível retornar projecto."})   
    }  
})

export default routerProject