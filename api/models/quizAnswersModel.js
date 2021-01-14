const mongoose = require('mongoose')

let quizAnswersSchema = new mongoose.Schema({
    title: { type:String, required:true },
    quiz: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Quiz' 
    },
    quizQuestion: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'QuizQuestions' 
    },
    sort:{ type:Number, default:0 },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('QuizAnswers', quizAnswersSchema)