var myapp = angular.module("IndexApp",["firebase"]);

myapp.controller('IndexCtr',['$scope','$firebaseArray',function($scope,$firebaseArray)
{
	var ref = new Firebase("https://happyteam.firebaseio.com/");
		$scope.carousels = $firebaseArray(ref.child('Carousel'));
		$scope.promos = $firebaseArray(ref.child('Promos'));;
	}]
);