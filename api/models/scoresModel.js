const mongoose = require('mongoose')

let scoresSchema = new mongoose.Schema({
    quiz: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Quiz' 
    },
    questionsCount:Number,
    correctAnswersCount:Number,
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    createdDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Scores', scoresSchema)