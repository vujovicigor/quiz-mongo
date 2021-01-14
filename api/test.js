const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mongo:loid@cluster0.ukhp7.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

let quizQuestionsSchema = new mongoose.Schema({
    title: { type:String, required:true },
//    sort:{ type:Number, default:0 },
    correctAnswerIndex:Number,
    answers:[{ answer:String }],
})

//let QuizQuestions = mongoose.model('QuizQuestions', quizQuestionsSchema)



let quizFullSchema = new mongoose.Schema({
  quizTitle: { type:String, required:true, unique:true },
  questions: [ quizQuestionsSchema ],
  createdBy: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  createdDate: { type: Date, default: Date.now }
})
//module.exports = mongoose.model('QuizAnswers', quizAnswersSchema)



const Quiz = mongoose.model('Quiz', quizFullSchema);

const kviz = new Quiz({
  quizTitle: 'quizTitle 4',
  questions:[
    {title:'question q title', correctAnswerIndex:1, answers:[ {answer:'a1'}, {answer:'a2'}, {answer:'a3'} ] }
  ],

  });
kviz.save().then(() => console.log('kviz', kviz));
