const mongoose = require('mongoose')

const ERRORS = {
  'No authorization token was found': {
    message: 'No authorization token was found',
    status: 401,
    errorCode: 1,
  },
  'User already exist': {
    message: 'User already exist',
    status: 401,
    errorCode: 1,
  },
  
  'CredentialsError': {
    message: 'Wrong credentials',
    status: 400,
    errorCode: 2,
  },
  'MissingParamsError': {
    message: 'Missing parameters',
    status: 400,
    errorCode: 2,
  },
  'NotFound': {
    message: 'Not found',
    status: 404,
    errorCode: 4,
  },
  'BadRequest': {
    message: 'Bad Request',
    status: 400,
    errorCode: 7,
  },
  'Forbidden':{
    message: 'Acces Denied',
    status: 400,
    errorCode: 8,
  }
}

module.exports = () => (err, req, res, next) => {
  console.log( err )
  if( err instanceof mongoose.Error){
    res.status(400).send({ status: 400, message:err.toString(), errorCode: 22 });    
    return
  }
  let errObj = { status: 400, message:'Unlisted error occurred', errorCode: 13}
  if (err.message && ERRORS[err.message])
    errObj = ERRORS[err.message]

  res.status(errObj.status).send(errObj);
};
