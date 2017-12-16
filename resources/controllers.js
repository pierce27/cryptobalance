var cryptKeeper = angular.module('cryptKeeper', ['ngSanitize']);


$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

cryptKeeper.controller('cryptCtrl', function CryptCtrl($scope, $http) {	

	// GET DATA FOR MTA SERVICE STATUS
	$http({method: 'GET', url: '/cryptkeep/all'}).
	success(function(data, status) {
		$scope.litecoin = data[0]
	  console.log(data);	  
	}).
	error(function(data, status) {
		// TODO Alert if error
	  
	});	

		// SIGN IN 
	$scope.getBalance = function(){
		// Create user object to send to server
		var cryptInfo = {
			'invested':this.invested,
			'btc': this.btc,
			'ltc': this.ltc,
			'eth': this.eth,
			'xrp': this.xrp
		}
	    console.log(cryptInfo)

	    // Attempt to login to server
		$http.post('/cryptkeep', cryptInfo).
		success(function(data, status) {
			console.log(data)

		}).
		error(function(data, status) {

	    	$scope.signInWarning = 'Incorrect Login'
	    	$('#signInWarning').removeClass('hide')			
			
		  
		});			
	}	






});







