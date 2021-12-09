import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
    title: {
         type: String,
         requered: true,
         unique: true
    },
    description: {
        type: String,
        requered: true,      
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'User',
         requered: true,
    },
    task: [],
    createAt: {
        type: Date,
        default: Date.now,
   }
})

export default mongoose.model('Project', ProjectSchema);