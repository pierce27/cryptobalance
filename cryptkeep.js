var https = require('https'),
sanitizeHtml = require('sanitize-html')
var urls = ['https://api.coinmarketcap.com/v1/ticker/bitcoin/', 'https://api.coinmarketcap.com/v1/ticker/litecoin/', 'https://api.coinmarketcap.com/v1/ticker/ethereum/', 'https://api.coinmarketcap.com/v1/ticker/ripple/']
var responses = [];
var completed_requests = 0;

exports.info = function(request, response){
	console.log(request.body)
	var btc_rate;
	var ltc_rate;
	var eth_rate;
	var xrp_rate;

	// for (i in urls) {
	//     https.get(urls[i], function(res) {
	//         responses.push(res);
	//         completed_requests++;
	//         if (completed_requests == urls.length) {
	//             // All download done, process responses array
	//             console.log(responses);
	//             for (i in responses){
	//             	var data = JSON.parse(responses[i].body)
	//             	console.log(data)
	//             }
	//         }
	//     });
	// }	


	urls.forEach(function(url) {
	  var responses = [];
	  https.get(url, function(res) {
	    res.on('data', function(chunk){
	      responses.push(chunk);
	    });

	    res.on('end', function(){
	      if (completed_requests++ == urls.length - 1) {
	        // All downloads are completed
	        // console.log(responses)
	        console.log('body:', responses.join());
	      }      
	    });
	  });
	})



	// https.get(btc_url, function(res){
	// 	// console.log(res)
	//     var body = '';
	//     res.on('data', function(chunk){
	//         body += chunk;
	//     });
	//     res.on('end', function(){
	//         var bitcoin = JSON.parse(body);
	//         btc_rate = bitcoin[0].price_usd
	//         // console.log("Got a response: ", bitcoin[0].price_usd);
	//         // response.send(body)
	//     });
	// }).on('error', function(e){
	//       console.log("Got an error: ", e);
	// });

	// // GET LTC Rate
	// https.get(ltc_url, function(res){
	// 	// console.log(res)
	//     var body = '';
	//     res.on('data', function(chunk){
	//         body += chunk;
	//     });
	//     res.on('end', function(){
	//         var litecoin = JSON.parse(body);
	//         ltc_rate = litecoin[0].price_usd
	//         // console.log("Got a response: ", litecoin[0].price_usd);
	//         // response.send(body)
	//     });
	// }).on('error', function(e){
	//       console.log("Got an error: ", e);
	// });

	// // Get ETH rate
	// https.get(eth_url, function(res){
	// 	// console.log(res)
	//     var body = '';
	//     res.on('data', function(chunk){
	//         body += chunk;
	//     });
	//     res.on('end', function(){
	//         var ethereum = JSON.parse(body);
	//         eth_rate = ethereum[0].price_usd
	//         // console.log("Got a response: ", ethereum[0].price_usd);
	//         // response.send(body)
	//     });
	// }).on('error', function(e){
	//       console.log("Got an error: ", e);
	// });		

	// 	// Get ETH rate
	// https.get(xrp_url, function(res){
	// 	// console.log(res)
	//     var body = '';
	//     res.on('data', function(chunk){
	//         body += chunk;
	//     });
	//     res.on('end', function(){
	//         var ripple = JSON.parse(body);
	//         xrp_rate = ripple[0].price_usd
	//         console.log("Got a response: ", xrp_rate);
	//         // response.send(body)
	//     });
	// }).on('error', function(e){
	//       console.log("Got an error: ", e);
	// });	

	// console.log(xrp_rate)

}