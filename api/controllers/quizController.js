const Quiz = require('../models/quizModel.js');
const Scores = require('../models/scoresModel.js')

module.exports.my_quiz_list = async (req, res) => {  
  const quiz = await Quiz.find({ createdBy:req.user._id }).populate('createdBy')
  //const quiz = await Quiz.find().populate('createdBy')
 return res.status(200).send({
    message: 'Ok',
    results: quiz,
  });
};

module.exports.my_quiz_insert = async (req, res) => {  
  let { quizTitle='', questions=[] } = req.vars
//  console.log('req.user', req.user)
  //if (!email || !password) throw new Error('MissingParamsError');  
  const quiz = new Quiz({ quizTitle, questions, createdBy: req.user._id })
  let q = await quiz.save()
  return res.status(200).send({
    message: 'Ok',
    results: q,
  });
};
  
module.exports.my_quiz_delete = async (req, res) => {  
  let { _id } = req.vars
  console.log('req.user', req.user)
  //if (!email || !password) throw new Error('MissingParamsError');  
  let q = await Quiz.deleteOne({_id, createdBy:req.user._id})
  return res.status(200).send({
    message: 'Ok',
    results: q,
  });
};
      
module.exports.my_quiz_update = async (req, res) => {  
  let { _id, quizTitle, questions, createdDate } = req.vars
  console.log('req.user', req.user)
  //if (!email || !password) throw new Error('MissingParamsError');  
  let q = await Quiz.findOneAndUpdate( {_id, createdBy:req.user._id}, { quizTitle, questions, createdDate } )
  return res.status(200).send({
    message: 'Ok',
    results: q,
  });
};
      
module.exports.take_a_quiz_list = async (req, res) => {  
  const quiz = await Quiz.find({
    'questions.0': {$exists: true},
    'questions.answers.0': {$exists: true}
  }).select('-questions.correctAnswerIndex').populate('createdBy')
  return res.status(200).send({
    message: 'Ok',
    results: quiz,
  });
};
      
module.exports.take_a_quiz_submit = async (req, res) => {  
  let { _id, questions} = req.vars
  const originalQuiz = await Quiz.findOne({_id}).select().lean()
  originalQuiz.questionsCount = originalQuiz.questions.length
  let correctAnswersCount = 0
  for (let i=0; i<originalQuiz.questions.length; i++){
    originalQuiz.questions[i].userAnswerIndex = questions[i].userAnswerIndex 
    if (originalQuiz.questions[i].correctAnswerIndex === originalQuiz.questions[i].userAnswerIndex) 
      correctAnswersCount++
    //delete originalQuiz.questions[i].answers
  }
  originalQuiz.correctAnswersCount = correctAnswersCount


  let score = new Scores({
    quiz: _id,
    questionsCount: originalQuiz.questionsCount,
    correctAnswersCount: originalQuiz.correctAnswersCount,
    createdBy: req.user._id
  })

  await score.save()

  return res.status(200).send({
    message: 'Ok',
    results: originalQuiz,
  });
};
