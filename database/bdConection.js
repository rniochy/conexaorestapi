import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const URI = process.env.URI
const uri = 'mongodb://localhost:27017/user'
mongoose.connect(uri,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
});

const connection = mongoose.connection
connection.once('open',()=>{
     console.log("Conectado com a bd ")
});