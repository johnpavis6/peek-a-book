var app = angular.module('peekabook', []);

app.controller('myCntrl', function ($scope, $window) {
    $scope.closeAlert = function () {
        $window.location.href = "/dashboard/addBook";
    };

    $scope.closeAlertStudent = function () {
        $window.location.href = "/dashboard/addStudent";
    };

    $scope.data = {};

    $scope.inc = function (attr) {
        console.log(attr)
        var arr = $scope.data[attr] || [];
        arr.push('');
        console.log(arr);
        $scope.data[attr] = arr;
    }
    $scope.dec = function (attr, ind) {
        var arr = $scope.data[attr];
        arr.splice(ind, 1);
        console.log(arr);
        $scope.data[attr] = arr;
    }

});