import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    surname: {
        required: true,
        type: String,
    },
    email: {
         required: true,
         type: String,
         unique: true,
         lowercase: true
    },
    password: {
         type: String,
         required: true,
         select: false,
    },
    createAt: {
         type: Date,
         default: Date.now,
    }
});

//  UserSchema.pre('save', async (next)=>{
//     const hash = await bcrypt.hash(this.password, 10);
//     this.password = hash

//     next()
//  })

export default mongoose.model('User', UserSchema);