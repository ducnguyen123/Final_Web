var myapp = angular.module("IndexApp", ["firebase"]);


myapp.controller('cartController', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject)
    {
        var ref = new Firebase("https://happyteam.firebaseio.com/");
        $scope.footer = $firebaseArray(ref.child('Footer'));
        //localStorage.users = null;
        if (localStorage.products)
            $scope.products = JSON.parse(localStorage.products);
        else
            $scope.products = $firebaseArray(ref.child('Products'));
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
                $scope.list = new Array();

                for (var i = 0; i < $scope.listCart.listCart.length; i++)
                {
                    for (var j = 0; j < $scope.products.length; j++)
                    {
                        if ($scope.listCart.listCart[i] == $scope.products[j].id)
                            $scope.list.push($scope.products[j]);
                    }
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


        $scope.addToCart = function (id)
        {
            if ($scope.author.username == 'Đăng nhập')
                location.href('login.html');
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

        $scope.removeItem = function (id)
        {
            for (var i = 0; i < $scope.listCart.listCart.length; i++)
            {
                if (id == $scope.listCart.listCart[i])
                {
                    $scope.listCart.listCart.splice(i, 1);
                    for (var i = 0; i < $scope.products.length; i++)
                    {
                        if ($scope.products[i].id == id)
                        {
                            $scope.listCart.totalPrice -= $scope.products[i].sellPrice;
                        }
                    }
                    var an = {
                        listCart: $scope.listCart.listCart,
                        totalPrice: $scope.listCart.totalPrice,
                        username: $scope.listCart.username
                    }

                    ref.child('ListCarts/' + u).update(an);
                    location.href = "cart.html";
                }
            }
        }
        $scope.Search = function ()
        {

            var f;
            for (var i = 0; i < $scope.products.length; i++)
            {
                if ($scope.products[i].name.toLowerCase().indexOf($scope.name.toLowerCase()) >= 0)
                {
                    location.href = "single-product.html?id=" + $scope.products[i].id.toString();;
                    f = true;
                }
            }
            if (!f)
                location.href = "single-product.html?id=" + $scope.products[0].id.toString();;

        }


    }]
        );
