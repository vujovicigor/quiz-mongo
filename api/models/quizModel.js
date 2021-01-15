const mongoose = require('mongoose')
/*
let quizSchema = new mongoose.Schema({
    title: { type:String, required:true },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    createdDate: { type: Date, default: Date.now }
})
*/
let quizQuestionsSchema = new mongoose.Schema({
  title: { type:String, required:true, trim:true },
//    sort:{ type:Number, default:0 },
  correctAnswerIndex:Number,
  answers:[{ answer:{ type:String, required: true } }],
})

let quiz = new mongoose.Schema({
  quizTitle: { type:String, required:true },
  questions: [ quizQuestionsSchema ],
  createdBy: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Quiz', quiz)