var myApp = angular.module("myApp", ["ngRoute","ngAnimate"]);

myApp.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider,$locationProvider) {

    $locationProvider.html5Mode(true)
    $routeProvider
      .when("/home", {
        templateUrl: "view/home.html",
        controller: "myController",
      })
      .when("/directory", {
        templateUrl: "view/directory.html",
        controller: "myController",
      })
      .when("/contact", {
        templateUrl: "view/contact.html",
        controller: "contactController",
      })
      .when("/contact-success", {
        templateUrl: "view/contact-success.html",
        controller: "contactController",
      })
      .otherwise({
        redirectTo: "/directory",
      });
  },
]);
myApp.directive("randomHero", [
  function () {
    return {
      restrict: "E",
      scope: {
        heros: "=",
        title: "=",
      },
      templateUrl: "view/random.html",
      transclude: true,
      replace: true,
      controller: function ($scope) {
        $scope.random = Math.floor(Math.random() * 5);
      },
    };
  },
]);
myApp.controller("contactController", [
"$scope",
"$location",
function ($scope, $location) {
  $scope.submitForm = function(){
   $location.path('/contact-success')
  }
}])
myApp.controller("myController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    console.log("in the controller");
    $scope.message = "oh, mighty God! I am praying to you!";

    //console.log(angular.toJson($scope.heros))
    $scope.order = "name";
    $scope.removeHero = function (hero) {
      console.log("removing");
      // $scope.heros.filter(item=>item.name!=hero.name)
      const removedIndex = $scope.heros.indexOf(hero);
      $scope.heros.splice(removedIndex, 1);
    };

    $scope.addNewHero = function () {
      $scope.heros.push({
        name: $scope.newHero.name,
        power: $scope.newHero.power,
        cost: parseInt($scope.newHero.cost),
        available: true,
      });
      $scope.clearValues();
    };
    $scope.removeAllHero =function(){
        $scope.heros =[]
    }
    $scope.clearValues = function () {
      $scope.newHero.name = "";
      $scope.newHero.power = "";
      $scope.newHero.cost = "";
    };


    $http
      .get("data/heros.json")
      .then((response) => response.data)
      .then((data) => ($scope.heros = data));
  },
]);
