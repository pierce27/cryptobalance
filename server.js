var util = require('util'),
  // MTA status functions
  cryptkeep = require('./cryptkeep'),
  // Routing middleware
  http = require('http'),
  express = require('express'),
  app = express(),
  // View engine dependency
  engines = require('consolidate'),
  bodyParser = require('body-parser'),
  // Login dependencites
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  user = require('./user'),
  cookieParser = require('cookie-parser')

// View config
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/resources'));
app.engine('html', engines.ejs);
app.set('view engine', 'html');
app.use(bodyParser.json());
// Passport login config
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());


// Configure passport login strategy
passport.use('localSignIn', new LocalStrategy(function(username, password, done) {
    // no authentication logic here... just return done with an object with 2 fields
    //
    console.log(username);
    user.findUserLogin(username, password, done);
}));

// Configure passport login strategy
passport.use('localSignUp', new LocalStrategy(function(username, password, done) {
    // no authentication logic here... just return done with an object with 2 fields
    console.log(username);
    user.createUser(username, password, done);
}));

// Render main view
app.get("/", function(req, res){
	res.render('index.html')
})


app.post('/cryptkeep', cryptkeep.newInvestmentData); 

// Get user data
app.get('/cryptkeep', cryptkeep.getInvestmentData)

// Login and set cookie
app.post('/login', passport.authenticate('localSignIn'), function(req, res) { 
  res.cookie('user', req.user.username, { maxAge: 2592000000 })
  console.log(req.user)
  res.send(req.user); 
}); 

// Signup and set cookie
app.post('/signUp', passport.authenticate('localSignUp'), function(req, res) { 
  res.cookie('user', req.user.username, { maxAge: 2592000000 })
  console.log(req.user.username)
  res.send(req.user); 
}); 

// Logout and delete cookite
app.get('/logout', function(req, res){
  res.clearCookie('user');
  res.sendStatus(201)
})

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Start Sever
app.listen(process.env.PORT || 3000)



