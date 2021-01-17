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

let ScoresModel = mongoose.model('Scores', scoresSchema) 

ScoresModel.db.createCollection('scoresGroupByQuizView', { 
  viewOn: 'scores', 
  pipeline: [
    { $group: {
        _id: '$quiz',
        totalAttemptsCount: {
          $sum: 1
        },        
        totalQuestionsCount: {
          $sum: "$questionsCount"
        },
        totalCorrectAnswersCount: {
          $sum: "$correctAnswersCount"
        }
      }
    }
  ] 
}).catch(()=>{console.log('view scoresGroupByQuizView already exist')})

ScoresModel.db.createCollection('scoresGroupByUserView', { 
  viewOn: 'scores', 
  pipeline: [
    { $group: {
        _id: '$createdBy',
        totalAttemptsCount: {
          $sum: 1
        },        
        totalQuestionsCount: {
          $sum: "$questionsCount"
        },
        totalCorrectAnswersCount: {
          $sum: "$correctAnswersCount"
        }
      }
    }
  ] 
}).catch(()=>{console.log('view scoresGroupByUserView already exist')})

module.exports = ScoresModel
