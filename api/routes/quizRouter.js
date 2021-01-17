const QuizController = require('../controllers/quizController.js');
const { catchAsyncError } = require('../lib/functionErrorHandler.js');
const groupReqVars = require('../middlewares/groupReqVars.js');
const router = require('express').Router();

router.route('/quiz-admin')
.get   ( groupReqVars, catchAsyncError(QuizController.my_quiz_list))
.post  ( groupReqVars, catchAsyncError(QuizController.my_quiz_insert))
.delete( groupReqVars, catchAsyncError(QuizController.my_quiz_delete))
.patch ( groupReqVars, catchAsyncError(QuizController.my_quiz_update))

router.route('/take-a-quiz')
.get   ( groupReqVars, catchAsyncError(QuizController.take_a_quiz_list))
.post  ( groupReqVars, catchAsyncError(QuizController.take_a_quiz_submit))

router.get('/high-score', catchAsyncError(QuizController.high_scores_user_list))

//.get('/quiz_list', groupReqVars, catchAsyncError(QuizController.quiz_list))
//.get('/quiz_insert', groupReqVars, catchAsyncError(QuizController.quiz_list))
  
module.exports = router;
