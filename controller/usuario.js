import express from 'express'
import User from '../model/user_model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const  routerUser = express.Router();

routerUser.post('/register', async (req, res)=>{
    const {email} = req.body

    try {
        const userverify = await User.findOne({email:email})
    
        if(userverify) return res.status(400).send({msgErr: "Usuário já existe"})
        
        const {name, surname,  password} = req.body 
        const newPassword = await bcrypt.hash(password, 10);
        const objUser = new User({name, surname, email, password: newPassword})
        await objUser.save();
        objUser.password = undefined 
         
        return res.send({
            msg: "Usuário criado",
            user: objUser                  
       })
    } catch(err){
        return res.status(401).send({msgErr: "Não foi possível criar usuário"})
    }
})

routerUser.post('/authenticate', async (req, res)=>{
      const {email, password} = req.body

      if(validateEmail(email)) return res.status(400).send({msgErr:"Email incorreto."});

      const user = await User.findOne({email:email}).select("+password")

      if(!user) return res.status(400).send({msgError: "Usuário não encontrado."})
      
    if(!await bcrypt.compare(password, user.password))  return res.status(400).send({msgError: "Palavra passe incorreta."})   
    
    user.password = undefined 

    
    return res.send({user, 
                    token: gerateToken({id: user.id})
                }) 

        });

routerUser.get('/getUsers', async (req, res)=>{
     const users = await User.find({})
     return res.send({user: users})
})

const validateEmail = email => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i.test(email)

const gerateToken = (params ={}) => {
    return jwt.sign(
        params, process.env.Secret, {
        expiresIn: 86000
        }
    )
}

export default routerUser