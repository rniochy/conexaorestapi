import express from 'express'
import User from '../model/user_model.js'
import bcrypt from 'bcryptjs'


const  router = express.Router()

router.post('/register', async (req, res)=>{
    const {email} = req.body



    try {
        const userverify = await User.findOne({email:email})
    
        if(userverify) return res.status(400).send({msgErr: "Usuário já existe"})
        
        const {name, surname,  password} = req.body 
        const newPassword = await bcrypt.hash(password, 10);
        const objUser = new User({name, surname, email, password: newPassword});
        console.log(objUser.password)
        await objUser.save();
        objUser.password = undefined 

        return res.send({
            msg: "Usuário criado",
            user: objUser                   
       })
    } catch(err){
        return res.status(400).send({msgErr: "Não foi possível criar usuário"})
    }
})

router.post('/authenticate', async (req, res)=>{
      const {email, password} = req.body

      if(validateEmail(email)) return res.status(400).send({msgErr:"Email incorreto."});

      const user = await User.findOne({email:email}).select("+password")

      if(!user) return res.status(400).send({msgError: "Usuário não encontrado."})

    if(!await bcrypt.compare(password, user.password))  return res.status(400).send({msgError: "Palavra passe incorreta."})
     console.log(user.password)
         
    user.password = undefined 
    return res.send({user})

});

router.get('/getUsers', async (req, res)=>{
     const users = await User.find({})
     return res.send({user: users})
})

const validateEmail = email => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.[a-z]?$/i.test(email)


export default router