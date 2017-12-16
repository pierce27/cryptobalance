var util = require('util'),
  // MTA status functions
  cryptkeep = require('./cryptkeep'),
  // Routing middleware
  http = require('http'),
  express = require('express'),
  app = express(),
  // View engine dependency
  engines = require('consolidate'),
  bodyParser = require('body-parser')
// View config
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/resources'));
app.engine('html', engines.ejs);
app.set('view engine', 'html');
app.use(bodyParser.json());

// Send all mta status data
// app.get('/cryptkeep/all', cryptkeep.info)

app.post('/cryptkeep', cryptkeep.info); 

// Render main view
app.get("/", function(req, res){
	res.render('index.html')
})

// Start Sever
app.listen(process.env.PORT || 3000)



