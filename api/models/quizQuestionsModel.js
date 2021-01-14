const mongoose = require('mongoose')

let quizQuestionsSchema = new mongoose.Schema({
    title: { type:String, required:true },
    quiz: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Quiz' 
    },
    sort:{ type:Number, default:0 },
    correctAnswer:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'QuizAnswer'
    },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('QuizQuestions', quizQuestionsSchema)