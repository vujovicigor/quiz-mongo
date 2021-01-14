const QuizController = require('../controllers/quizController.js');
const { catchAsyncError } = require('../lib/functionErrorHandler.js');
const groupReqVars = require('../middlewares/groupReqVars.js');
const router = require('express').Router();

router.route('/quiz-admin')
.get   ( groupReqVars, catchAsyncError(QuizController.my_quiz_list))
.post  ( groupReqVars, catchAsyncError(QuizController.my_quiz_insert))
.delete( groupReqVars, catchAsyncError(QuizController.my_quiz_delete))
.patch ( groupReqVars, catchAsyncError(QuizController.my_quiz_update))

//.get('/quiz_list', groupReqVars, catchAsyncError(QuizController.quiz_list))
//.get('/quiz_insert', groupReqVars, catchAsyncError(QuizController.quiz_list))
  
module.exports = router;
