var myapp = angular.module("IndexApp", ["firebase"]);


myapp.controller('addProductController', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject)
    {
        var ref = new Firebase("https://happyteam.firebaseio.com/");
        //localStorage.users = null;
        if (localStorage.products)
            $scope.products = JSON.parse(localStorage.products);
        else
            $firebaseArray(ref.child('Products')).$loaded().then(function (Products) {
                $scope.products = Products;
            });
        var user = localStorage.users;
        if (user)
        {
            if (user == 'minhduc074@gmail.com' || user == 'heocondangyeu0@gmail.com')
            {

            } else
                location.href = 'login.html';
        } else
        {
            location.href = 'login.html';
        }

        $scope.addProduct = function () {
            var p = {
                name: $scope.name,
                image: $scope.image,
                Description: $scope.description,
                price: $scope.price,
                sellPrice: $scope.sellPrice,
                id: $scope.products.length + 1,
            };

            $scope.products.push(p);

            var up = new Array();

            for (var i = 0; i < $scope.products.length; i++)
            {
                var temp = {
                    name: $scope.products[i].name,
                    image: $scope.products[i].image,
                    Description: $scope.products[i].Description,
                    price: $scope.products[i].price,
                    sellPrice: $scope.products[i].sellPrice,
                    id: $scope.products[i].id,
                }
                up.push(temp);
            }

            ref.child('Products').update(up);
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
