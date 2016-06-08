var myapp = angular.module("IndexApp", ["firebase"]);


myapp.controller('IndexCtr', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject)
    {
        $scope.ahome = "active";
        $scope.ashop = false;
        $scope.asproduct = false;
        $scope.acart = false;
        $scope.acheckout = false;
        $scope.aaproduct = false;

        var ref = new Firebase("https://happyteam.firebaseio.com/");
        $scope.carousels = $firebaseArray(ref.child('Carousel'));
        $scope.promos = $firebaseArray(ref.child('Promos'));
        var ref = new Firebase("https://happyteam.firebaseio.com/");
        $scope.footer = $firebaseArray(ref.child('Footer'));
        $scope.LoginDN = true;
        $scope.LoginDX = false;


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

        $scope.LoadJson = function () {
            var data_file = "js/DataAjax.json";
            var http_request = new XMLHttpRequest();
            try {
                // Opera 8.0+, Firefox, Chrome, Safari
                http_request = new XMLHttpRequest();
            } catch (e) {
                // Internet Explorer Browsers
                try {
                    http_request = new ActiveXObject("Msxml2.XMLHTTP");

                } catch (e) {

                    try {
                        http_request = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        // Something went wrong
                        alert("Your browser broke!");
                        return false;
                    }

                }
            }

            http_request.onreadystatechange = function () {

                if (http_request.readyState == 4) {
                    // Javascript function JSON.parse to parse JSON data
                    var jsonObj = JSON.parse(http_request.responseText);

                    // jsonObj variable now contains the data structure and can
                    // be accessed as jsonObj.name and jsonObj.country.
                    document.getElementById("Ajax").innerHTML = jsonObj.Description;

                }
            }

            http_request.open("GET", data_file, true);
            http_request.send();
        }

    }]
        );
