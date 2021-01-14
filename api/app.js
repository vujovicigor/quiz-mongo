require('dotenv').config()
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const ErrorHandler = require('./middlewares/errorHandler');
const jwtHandler = require('./lib/jwtHandler');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
const UserRoutes   = require('./routes/userRouter');
const QuizRoutes   = require('./routes/quizRouter');

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.disable('x-powered-by');

// Security TODO
//app.use(lusca.xframe('ALLOWALL'));
//app.use(lusca.xframe('SAMEORIGIN'));
//app.use(lusca.xssProtection(true));

// Whitelisted routes
app.use(expressJwt({ secret: jwtHandler.getTokenSecret(), algorithms: ['HS256'] }).unless({
  path: [
    '/api/v2/signup',
    '/api/v2/auth',
    /\/api\/v2\/public_\w*/,
  ],
}));

app.use('/api/v2', UserRoutes);
app.use('/api/v2', QuizRoutes);

app.use(ErrorHandler());

console.log('__________thequiz API __________')
console.log(`Runs on port: ${port}`);
console.log(`Env: ${process.env.NODE_ENV}`)
console.log('________________________________');

var server = require('http').Server(app);
module.exports = app;

mongoose.connect(process.env.MONGOCONN, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('mongo connected');
  server.listen(port);
}, error => {
  console.log('mongo error', error);
})