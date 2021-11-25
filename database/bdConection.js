import mongoose from 'mongoose'

const uri = 'mongodb://localhost:27017/user'
mongoose.connect(uri,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once('open',()=>{
     console.log("Conectado com a bd ")
})