var myapp = angular.module("IndexApp", ["firebase"]);


myapp.controller('checkOutController', ['$scope', '$firebaseArray', '$firebaseObject', function ($scope, $firebaseArray, $firebaseObject)
    {
        $scope.ahome = false;
        $scope.ashop = false;
        $scope.asproduct = false;
        $scope.acart = false;
        $scope.acheckout = "active";
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
                            {
                                var f = false;
                                for (var k = 0; k < $scope.list.length; k++)
                                {
                                    if ($scope.listCart.listCart[i] == $scope.list[k].product.id)
                                    {
                                        $scope.list[k].count++;
                                        f = true;
                                    }
                                }
                                if (!f)
                                {

                                    var p = {
                                        product: $scope.products[j],
                                        count: 1,
                                    }

                                    $scope.list.push(p);
                                }
                            }
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
                    location.href = "single-product.html?id=" + $scope.products[i].id.toString();
                    ;
                    f = true;
                }
            }
            if (!f)
                location.href = "single-product.html?id=" + $scope.products[0].id.toString();
            ;

        }
        $scope.checkout = function ()
        {
            location.href = "checkout.html";
            var a;
        }

        var xmlhttp = new XMLHttpRequest();
        var url = "js/1.json";

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var myArr = JSON.parse(xmlhttp.responseText);
                myFunction(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        function myFunction(arr) {
            var out = "";
            var i;
            for (i = 0; i < arr.A.length; i++) {
                out += '<option value="' + arr.A[i].id + '">' +
                        arr.A[i].name + '</option>';
            }
            document.getElementById("shipping_country").innerHTML = out;
            document.getElementById("billing_country").innerHTML = out;
        }

    }]
        );
