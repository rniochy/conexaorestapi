import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    title: {
         type: String,
         requered: true
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        refer: 'Project',
        requered: true
    },
    AssignedTo: {
         type: mongoose.Schema.Types.ObjectId,
         refer:'User',
         requered: true
    },
    completed: {
         type: Boolean,
         requered: true,
         default: false
    },
    createAt: {
        type: Date,
        default: Date.now,
   }
})

export default mongoose.model('Task', TaskSchema);