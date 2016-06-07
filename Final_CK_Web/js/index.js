var myapp = angular.module("IndexApp", ["firebase"]);


myapp.controller('IndexCtr', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject)
    {
        var ref = new Firebase("https://happyteam.firebaseio.com/");
        $scope.carousels = $firebaseArray(ref.child('Carousel'));
        $scope.promos = $firebaseArray(ref.child('Promos'));
        var ref = new Firebase("https://happyteam.firebaseio.com/");
        //localStorage.users = null;
        if (localStorage.products)
            $scope.products = JSON.parse(localStorage.products);
        else
            $firebaseArray(ref.child('Products')).$loaded().then(function (Products) {
                $scope.products = $firebaseArray(Products);
            });
        var user = localStorage.users;
        var u;
        if (user)
        {

            u = user;
            u = u.replace('@', '');
            u = u.replace('.', '');
            $scope.listCart = {
                listCart: new Array(),
                totalPrice: 0,
                username: user,
            }
            $firebaseArray(ref.child('ListCarts/' + u + '/listCart')).$loaded().then(function (list) {
                for (var i = 0; i < list.length; i++)
                {
                    $scope.listCart.listCart.push(list[i].$value);
                }
            });
            $firebaseObject(ref.child('ListCarts/' + u + '/totalPrice')).$loaded().then(function (price) {
                $scope.listCart.totalPrice = price.$value;
            });
            ;
            $firebaseObject(ref.child('ListCarts/' + u + '/username')).$loaded().then(function (username) {
                $scope.listCart.username = username.$value;
            });
        }

        $scope.author = {
            username: 'Đăng nhập',
            link: 'login.html'
        }

        if (user != 'null')
        {
            $scope.author.username = user;
            $scope.author.link = '#';
        } else
        {
            $scope.author.username = 'Đăng nhập';
            $scope.author.link = 'login.html';
        }

        $scope.logoutUp = function () {
            var firebaseObj = new Firebase("https://happyteam.firebaseio.com/");
            firebaseObj.unauth();
            localStorage.users = null;
            location.href = "index.html";
            location.reload();
        }


        $scope.addToCart = function (id)
        {
            if ($scope.author.username == 'Đăng nhập')
                location.href = 'login.html';
            if ($scope.listCart.length == 0)
            {
                $scope.listCart = {
                    listCart: new Array(),
                    totalPrice: 0,
                    username: $scope.author.username,
                }
            }
            $scope.listCart.listCart.push(id);
            for (var i = 0; i < $scope.products.length; i++)
            {
                if ($scope.products[i].id == id)
                {
                    $scope.listCart.totalPrice += $scope.products[i].sellPrice;
                }
            }

            var an = {
                listCart: $scope.listCart.listCart,
                totalPrice: $scope.listCart.totalPrice,
                username: $scope.listCart.username
            }

            ref.child('ListCarts/' + u).update(an);
        }

    }]
        );
