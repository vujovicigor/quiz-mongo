const Quiz = require('../models/quizModel.js');

module.exports.my_quiz_list = async (req, res) => {  
 // const quiz = await Quiz.find({ createdBy:req.user._id }).populate('createdBy')
  const quiz = await Quiz.find().populate('createdBy')
 return res.status(200).send({
    message: 'Ok',
    results: quiz,
  });
};

module.exports.my_quiz_insert = async (req, res) => {  
  let { title } = req.vars
//  console.log('req.user', req.user)
  //if (!email || !password) throw new Error('MissingParamsError');  
  const quiz = new Quiz({ title, createdBy: req.user._id })
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
  let { _id, title } = req.vars
  console.log('req.user', req.user)
  //if (!email || !password) throw new Error('MissingParamsError');  
  let q = await Quiz.findOneAndUpdate({_id, createdBy:req.user._id}, {title})
  return res.status(200).send({
    message: 'Ok',
    results: q,
  });
};
      