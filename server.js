var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://cs4550-bk610-project-client.herokuapp.com');
  //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  resave: false,
  saveUnitialized: true,
  secret: 'my secret though yo'
}));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost');


requireModerator = function(req, res, next) {
  if (req.session['currentUser'].role !== 'MODERATOR' &&
      req.session['currentUser'].role !== 'ADMIN') {
    res.send({'error': 'Moderator required'});
  } else {
    next();
  }
}

requireLoggedOut = function(req, res, next) {
  if (req.session['currentUser']) {
    res.send({'error': 'Must not be logged in'});
  } else {
    next();
  }
}

requireLoggedIn = function(req, res, next) {
  if (!req.session['currentUser']) {
    res.send({'error': 'User login required'});
  } else {
    next();
  }
}

requireAdmin = function(req, res, next) {
  if (req.session['currentUser'].role  !== 'ADMIN') {
    res.send({'error': 'Admin required'});
  } else {
    next();
  }
}

require('./services/post.service.server')(app);
require('./services/feed.service.server')(app);
require('./services/feed-follow.service.server')(app);
require('./services/user.service.server')(app);
require('./services/user-follow.service.server')(app);

app.listen(process.env.PORT || 3000);

function setSession(request, res) {
  var name = request.params.name;
  var val = request.params.value;
  request.session[name] = val;
  res.send(request.session);
}

function getSession(request, res) {
  var name = request.params.name;
  var val = request.session[name];
  res.send(val);
}

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

