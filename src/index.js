var http=require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
var LocalStrategy=require('passport-local').Strategy;
const config =require('./config');
const routes=require('./routes');
var app=express();
app.server=http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
  limit:config.bodyLimit
}));

//passport config

app.use(passport.initialize());
var Account=require('./model/account');
passport.use(new LocalStrategy({
  usernameField:'email',
  passwordField:'password'
},
Account.authenticate()
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//api routes
app.use('/api/v1',routes);
app.server.listen(config.port,'0.0.0.0');
module.exports=app;
