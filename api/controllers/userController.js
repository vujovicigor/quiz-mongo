const { issueNewToken } = require('../lib/jwtHandler.js');
//const Quiz = require('../models/quizModel.js');
const User = require('../models/userModel.js');

module.exports.signup = async (req, res) => {
  const { email, password, name_first, name_last } = req.body
  if (!email || !password) {
    throw new Error('MissingParamsError');
  }

  const check_email = await User.find({ email })  
  if (check_email && check_email.length === 0) {
    let newUser = new User({ email, password, name_first, name_last })
    await newUser.save()
    return res.status(200).send({
      message: 'Successfully signed in',
      token: issueNewToken(newUser.toObject()),
      results: newUser.toObject(),
    });
  }
  throw new Error('User already exist')
};

module.exports.auth = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('MissingParamsError');  
  const user = await User.findOne({email}).select('+password')//.lean()
  if (!user || !user.comparePassword(password)) {
    throw new Error('CredentialsError')
  }
  let usr = user.toObject()
  delete(usr.password)

  return res.status(200).send({
    message: 'Successfully signed in',
    token: issueNewToken(usr),
    results: usr,
  });
};

module.exports.userList = async (req, res) => {
  if (!req.user || !req.user._id ) {
    throw new Error('CredentialsError')
  }
  const user = await User.find().lean()

  return res.status(200).send({
    message: 'ok',
    results: user,
  });
};
