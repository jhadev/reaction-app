const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// middleware - preprocessing of different requests before being sent to route handler
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //want cookie to last 30 days
    keys: [keys.cookieKey] //encrypts cookie
  })
);
// tell passport to use cookies to manage authentication
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

// app.listen: express telling node (the runtime) what port to listen to
// process.env: look at the underlying environment and see if they declared a port
const PORT = process.env.PORT || 5000
app.listen(PORT);


