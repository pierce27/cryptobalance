var https = require('https')
var url = 'https://bittrex.com/api/v1.1/public/getmarketsummaries'
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var mongo_url = 'mongodb://apierce:cryptkeep123@ds133557.mlab.com:33557/heroku_bshglnm9'
// 'mongodb://localhost/test'
mongoose.connect(mongo_url);
var User = require('./user_model.js');
// // Create User Schema
// var User = mongoose.model('User',{
//     username: String,
//     password: String,
//     investmentData: Object
// });



exports.newInvestmentData = function(request, response){
	var userData = request.body
	// Find user and save doc
	// console.log(request.cookies)
	User.findOne({ username: request.cookies.user }, function (err, user){
	  user.investmentData = userData;
	  user.save();
	});	

	https.get(url, function(res){
		// console.log(res)
	    var body = '';
	    res.on('data', function(chunk){
	        body += chunk;
	    });
	    res.on('end', function(){
	        var markets = JSON.parse(body);
	        var rates = getRates(markets.result)
	        var investmentInfo = calcInvestment(rates, userData)
	        console.log(investmentInfo)

	        // console.log(markets.result[0])
	        response.send(investmentInfo)

	    });
	}).on('error', function(e){
	      console.log("Got an error: ", e);
	});

}

exports.getInvestmentData = function(request, response){
	var userData = {}
	// Find user based on cookie
	User.findOne({ 'username': request.cookies.user }, function (err, user) {
	  if (err) return err;
	  var userData = user.investmentData

	  https.get(url, function(res){
		console.log('User Data: '+ JSON.stringify(userData))
		// console.log(res)
	    var body = '';
	    res.on('data', function(chunk){
	        body += chunk;
	    });
	    res.on('end', function(){
	        var markets = JSON.parse(body);
	        var rates = getRates(markets.result)
	        var investmentInfo = calcInvestment(rates, userData)
	        console.log(investmentInfo)

	        // console.log(markets.result[0])
	        response.send(investmentInfo)

	    	});
		}).on('error', function(e){
	      console.log("Got an error: ", e);
		});
	  
	})

	

}



var getRates = function(marketData){
	var rates = {}

	for (var i = marketData.length - 1; i >= 0; i--) {
		var marketName = marketData[i].MarketName 
		var currency = marketName.replace(/-.*/g, '')
		var crypto = marketName.replace(/.*-/g, '')
		if (currency == 'USDT') {
			crypto = crypto.toLowerCase()
			rates[crypto] = marketData[i].Ask
		}
	
	}
	return rates
}

var calcInvestment = function(rates, userData){
	var investmentInfo = {'details':{}, 'total':'', 'profit':'', 'invested_now':''}
	var value;
	var price; 
	var amount;
	investmentInfo.total = 0;
	for(var key in userData){
		if(key == 'invested'){
			investmentInfo.invested_now = parseInt(userData[key])
		} else {
			amount = userData[key];
			price = rates[key];
			value = amount*price;
			investmentInfo.total += value;

			investmentInfo.details[key] = {'price': price, 'amount':amount, 'value':value}			
		}

	}
	investmentInfo.profit = investmentInfo.total - investmentInfo.invested_now;
	return(investmentInfo)
}