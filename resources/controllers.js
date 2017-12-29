var cryptKeeper = angular.module('cryptKeeper', ['ngCookies']);

cryptKeeper.controller('cryptCtrl', function CryptCtrl($scope, $http, $cookies) {	

	$scope.hideTable = true;
	
	var newData = function(postData)	{

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
	

	// if(!$cookies.cryptkeep){
	// 	console.log('no cookie')
	// } else {
	// 	$scope.hideForm = true;
	// 	var data = $cookies.cryptkeep;
	// 	getBalance(data);
	// }

	// Check for cookie and if it exists get user data from server
	if(document.cookie){
		console.log(document.cookie)
		$scope.hideForm = true;
		$http({method: 'GET', url: '/cryptkeep'}).
		success(function(data, status) {
		  // Set user data in the scope
		  $scope.cryptData = data; 	

		}).
		error(function(data, status) {
			// TODO Alert if error
		  	alert(status)
		});			

	}	

	$scope.newInvestmentData = function(){
		
		// Create user object to send to server
		var cryptInfo = {
			'invested':this.invested,
			'btc': this.btc,
			'ltc': this.ltc,
			'eth': this.eth,
			'xrp': this.xrp,
			'bcc': this.bcc
		};
	    
	    $cookies.cryptkeep = JSON.stringify(cryptInfo);
	    $scope.hideForm = true;
	    newData(cryptInfo);

		
	}

	$scope.newInfo = function(){
		$scope.invested = $scope.cryptData.invested_now
		$scope.btc = $scope.cryptData.details.btc.amount
		$scope.ltc = $scope.cryptData.details.ltc.amount
		$scope.eth = $scope.cryptData.details.eth.amount
		$scope.xrp = $scope.cryptData.details.xrp.amount
		$scope.bcc = $scope.cryptData.details.bcc.amount
		console.log('clicked')
		$cookies.cryptkeep = false;
		$scope.hideForm = false;
		$scope.cryptData = {}
	}


	// SIGN IN 
	$scope.signIn = function(){
		// Create user object to send to server
	    var user = {
	      'username': this.username,
	      'password': this.password
	    };

	    // Attempt to login to server
		$http.post('/login', user).
		success(function(data, status) {
		  $scope.user = data;
		$http({method: 'GET', url: '/cryptkeep'}).
		success(function(data, status) {
		  // Set user data in the scope
		  $scope.hideForm = true;		  
		  $scope.cryptData = data; 	

		}).
		error(function(data, status) {
			// TODO Alert if error
		  	alert(status)
		});	
		  $('#signInWarning').addClass('hide')			
		  $('#signInModal').modal('hide');

		}).
		error(function(data, status) {

	    	$scope.signInWarning = 'Incorrect Login'
	    	$('#signInWarning').removeClass('hide')			
			
		  
		});			
	}

	// SIGN UP
	$scope.signUp = function(){
		// Create user object to send to sever
	    var user = {
	      'username': this.username,
	      'password': this.password
	    };



	    // Check that passwords match
	    if(this.password != this.confirmPassword){
	    	$scope.signUpWarning = 'Passwords Do Not Match'
	    	$('#signUpWarning').removeClass('hide')
	    } else if(this.username.length < 6 || this.password.length < 6){
	    	$scope.signUpWarning = 'Username / Pssword must be 6 characters or more'
	    	$('#signUpWarning').removeClass('hide')	    	
	    } else{
	    	// If passwords match then send data to server
			$http.post('/signUp', user).
			success(function(data, status) {
			  // Send user object of scope to the newly create user
			  $scope.user = data;
		  	  // Hide sign in modal
		  	  $('#signUpWarning').addClass('hide')
			  $('#signInModal').modal('hide');
			  $scope.signUpWarning = ''

			}).
			error(function(data, status) {
				// Alert if error  
				alert('User Name Taken')
			  
			});				    	
	    }

		
	}	

	// SIGN OUT
	$scope.signOut = function(){
		// Logout from server so cookies can be cleared
		$http.get('/logout').
		success(function(data, status){
			// Delete user object
			$scope.user = '';
			// Clear cookies
			document.cookie = '';
			// Hide favorites because user is not logged in
			$scope.showFavorites = false;
			// Show sign in modal to sign in again if needed
			$('#signInModal').modal('show');
		}).
		error(function(data, status){
			// TODO Handle error
			console.log(status)

		})
	}



});







