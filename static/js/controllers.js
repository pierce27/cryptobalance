var cryptKeeper = angular.module('cryptKeeper', ['ngCookies']);

cryptKeeper.controller('cryptCtrl', function CryptCtrl($scope, $http, $cookies) {	

	$scope.hideTable = true;
	
	var getBalance = function(postData)	{

	    // Attempt to login to server
		$http.post('/cryptkeep', postData).
		success(function(data, status) {
			console.log(data)
			$scope.cryptData = data
			// $scope.$apply()
			// $cookies.put('test', 'thisIsATest')
			$scope.hideTable = false;
			console.log(data)

		}).
		error(function(data, status) {

	    	$scope.signInWarning = 'Incorrect Login'
	    	$('#signInWarning').removeClass('hide')			
			
		  
		});			

	}
	

	if(!$cookies.cryptkeep){
		console.log('no cookie')
	} else {
		$scope.hideForm = true;
		var data = $cookies.cryptkeep;
		getBalance(data);
	}

	$scope.getBalance = function(){
		
		// Create user object to send to server
		var cryptInfo = {
			'invested':this.invested,
			'btc': this.btc,
			'ltc': this.ltc,
			'eth': this.eth,
			'xrp': this.xrp,
			'bch': this.bch
		};
	    
	    $cookies.cryptkeep = JSON.stringify(cryptInfo);
	    $scope.hideForm = true;
	    getBalance(cryptInfo);

		
	}

	$scope.newInfo = function(){
		console.log('clicked')
		$cookies.cryptkeep = false;
		$scope.hideForm = false;
		$scope.cryptData = {}
	}



});







