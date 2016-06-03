var App = angular.module('IndexApp', ['firebase']);
App.controller('IndexCtr', function($scope, $firebaseObject){
	var self = $scope;
	var ref = new Firebase("https://happyteam.firebaseio.com/");
	
	
	self.signUp = function() {
		var ref = new Firebase("https://happyteam.firebaseio.com/");
	
    ref.createUser({
    	email: $scope.email,
    	password: $scope.password
    }, function(error, userData) {
    	if (error) {
    		console.log("Error creating user: ", error);
    	} else {
    		console.log("Successfully created user account with uid: ", userData.uid);
    		console.log(userData);
    	}
    });
		
	}

	self.loginUp = function () {
		var ref = new Firebase("https://happyteam.firebaseio.com/");
		ref.authWithPassword({
			email    : $scope.username,
			password : $scope.password
		}, function(error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				
				console.log("Authenticated successfully with payload:", authData);
				location.href="index.html";
			}
		});
	}

	self.logoutUp = function () {
		$scope.$unauth();
        location.reload();
	}
	
	self.loginFb = function(){
		var provider = new firebase.auth.FacebookAuthProvider();
		provider.addScope('user_birthday');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		
		});
		firebase.auth().signInWithRedirect(provider);
		firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			var token = result.credential.accessToken;
			// ...
		}
		// The signed-in user info.
		var user = result.user;
		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		});
		
	}
	
	self.loginGg = function(){
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		});
		firebase.auth().signInWithRedirect(provider);
		firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// ...
		}
		// The signed-in user info.
		var user = result.user;
		}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
		});
	}
});
