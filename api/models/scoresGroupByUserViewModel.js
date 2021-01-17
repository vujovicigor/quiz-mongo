const mongoose = require('mongoose')

/*
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

*/
let scoresGroupByUserViewSchema = new mongoose.Schema({
    _id: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    },
    totalAttemptsCount:Number,
    totalQuestionsCount:Number,
    totalCorrectAnswersCount:Number,
  }, { collection : 'scoresGroupByUserView' })

let ScoresGroupByUserViewModel = mongoose.model('scoresGroupByUserView', scoresGroupByUserViewSchema) 
module.exports = ScoresGroupByUserViewModel



