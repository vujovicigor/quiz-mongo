const UserController = require('../controllers/userController.js');
const { catchAsyncError } = require('../lib/functionErrorHandler.js');
const groupReqVars = require('../middlewares/groupReqVars.js');
const router = require('express').Router();

router
.post('/signup', groupReqVars, catchAsyncError(UserController.signup))
.post('/auth', groupReqVars, catchAsyncError(UserController.auth))
.get('/user', groupReqVars, catchAsyncError(UserController.userList))
  
module.exports = router;
