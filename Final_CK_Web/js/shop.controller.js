var myapp = angular.module("IndexApp", ["firebase"]);


myapp.controller('shopController', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject)
    {
        $scope.ahome = false;
        $scope.ashop = "active";
        $scope.asproduct = false;
        $scope.acart = false;
        $scope.acheckout = false;
        $scope.aaproduct = false;
        var ref = new Firebase("https://happyteam.firebaseio.com/");
		$scope.footer = $firebaseArray(ref.child('Footer'));
        //localStorage.users = null;
        if (localStorage.products)
            $scope.products = JSON.parse(localStorage.products);
        else
            $firebaseArray(ref.child('Products')).$loaded().then(function (Products) {
                $scope.products = Products;
                localStorage.products = JSON.stringify($scope.products);
            });
        var user = localStorage.users;
        var u = user;
        if (u)
        {
            if (user != 'null')
            {
                if (user == 'minhduc074@gmail.com' || user == 'heocondangyeu0@gmail.com')
                {
                    $scope.admin = true;
                } else
                    $scope.admin = false;

                $scope.LoginDN = true;
                $scope.LoginDX = true;

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
        }

        $scope.author = {
            username: 'Đăng nhập',
            link: 'login.html'
        }

        if (u)
        {
            if (user != 'null')
            {
                $scope.author.username = user;
                $scope.author.link = '#';
                $scope.LoginDN = true;
                $scope.LoginDX = true;
            } else
            {
                $scope.author.username = 'Đăng nhập';
                $scope.author.link = 'login.html';
                $scope.LoginDN = true;
                $scope.LoginDX = false;
            }
        } else
        {
            $scope.author.username = 'Đăng nhập';
            $scope.author.link = 'login.html';
            $scope.LoginDN = true;
            $scope.LoginDX = false;
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

    }]
        );
