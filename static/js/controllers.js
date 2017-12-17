var cryptKeeper = angular.module('cryptKeeper', []);

cryptKeeper.controller('cryptCtrl', function CryptCtrl($scope, $http) {	
	$scope.hi = 'hi'
	console.log($scope.hi)
		// SIGN IN 
	// $scope.getBalance = function(){
	// 	// Create user object to send to server
	// 	var cryptInfo = {
	// 		'invested':this.invested,
	// 		'btc': this.btc,
	// 		'ltc': this.ltc,
	// 		'eth': this.eth,
	// 		'xrp': this.xrp
	// 	}
	//     console.log(cryptInfo)

	//     // Attempt to login to server
	// 	$http.post('/cryptkeep', cryptInfo).
	// 	success(function(data, status) {
	// 		console.log(data)
	// 		$scope.cryptData = data
	// 		// $scope.$apply()

	// 	}).
	// 	error(function(data, status) {

	//     	$scope.signInWarning = 'Incorrect Login'
	//     	$('#signInWarning').removeClass('hide')			
			
		  
	// 	});			
	// }	






});







