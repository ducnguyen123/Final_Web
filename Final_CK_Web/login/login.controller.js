var App = angular.module('IndexApp', ['firebase']);


App.factory('ServiceSave', ['$firebaseArray', function ($firebaseArray)
    {
        localStorage.users = null;

        var ref = new Firebase("https://happyteam.firebaseio.com/");
        return {
            getProductr: function () {
                return $firebaseArray(ref.child('Products'));
            },
            getCurentUserr: function () {
                if (!localStorage.users) {
                }
                return localStorage.users;
            },
            setCurentUserr: function (user) {
                localStorage.users = user;
            },
            getListCartr: function (user) {
                var listCarts = $firebaseArray(ref.child('ListCarts'));
                var listCart;
                for (var i = 0; i < listCarts.length; i++)
                {
                    if (listCarts[i].username == user)
                        listCart = listCarts[i].listCart;
                }


                if (!listCart) {
                    listCart = JSON.stringify([]);
                }

                return JSON.parse(listCart);
            },
            setListCartr: function (user, listCart) {
                var listCarts = $firebaseArray(ref.child('ListCarts'));
                var f;
                var s = {
                    username: user,
                    listCart: listCart
                }
                for (var i = 0; i < listCarts.length; i++)
                {
                    if (listCarts[i].username == user)
                    {
                        listCarts[i].s;
                        f = true;
                    }
                }
                if (!f)
                    listCarts.push(s);
                ref.child('ListCarts').update(listCarts);
            }
        };
    }
]);

App.controller('IndexCtr', ['$scope', 'ServiceSave', function ($scope, ServiceSave)
    {
        var self = $scope;
        var ref = new Firebase("https://happyteam.firebaseio.com/");
        $scope.LoginDN = true;
        $scope.LoginDX = false;

        $scope.products = ServiceSave.getProductr();

        self.signUp = function () {
            var ref = new Firebase("https://happyteam.firebaseio.com/");

            localStorage.products = JSON.stringify($scope.products);
            ref.createUser({
                email: $scope.email,
                password: $scope.password
            }, function (error, userData) {
                if (error) {
                    console.log("Error creating user: ", error);
                } else {
                    console.log("Successfully created user account with uid: ", userData.uid);
                    console.log(userData);
                    localStorage.users = userData.password.email;

                    location.href = "index.html";
                }
            });

        }

        self.loginUp = function () {
            var ref = new Firebase("https://happyteam.firebaseio.com/");
            localStorage.products = JSON.stringify($scope.products);
            ref.authWithPassword({
                email: $scope.email,
                password: $scope.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {

                    console.log("Authenticated successfully with payload:", authData);
                    localStorage.users = authData.password.email;
                    localStorage.products = JSON.stringify($scope.products);
                    location.href = "index.html";
                    localStorage.LoginDN = false;
                    localStorage.LoginDX = true;
                }
            });
        }

        self.logout = function () {
            var firebaseObj = new Firebase("https://happyteam.firebaseio.com/");
            firebaseObj.unauth();
            localStorage.users = null;
            $scope.LoginDN = true;
            $scope.LoginDX = false;
            location.reload();
        }

        self.loginFb = function () {
            var ref = new Firebase("https://happyteam.firebaseio.com");
            ref.authWithOAuthPopup("facebook", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    localStorage.users = authData.facebook.displayName;
                    localStorage.products = JSON.stringify($scope.products);
                    location.href = "index.html";
                    localStorage.LoginDN = false;
                    localStorage.LoginDX = true;
                }
            }, {
                remember: "sessionOnly",
                scope: "email,user_likes"
            });

        }

        self.loginGg = function () {
            var ref = new Firebase("https://happyteam.firebaseio.com");
            ref.authWithOAuthPopup("google", function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                    localStorage.users = authData.google.displayName;
                    localStorage.products = JSON.stringify($scope.products);
                    location.href = "index.html";
                    localStorage.LoginDN = false;
                    localStorage.LoginDX = true;
                }
            }, {
                remember: "sessionOnly",
                scope: "email"
            });
        }
    }]);
