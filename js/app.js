/*--------------Modules--------------*/


/* Main StatusLex App Module */
var planning = angular.module('planning', [ 'ngRoute', 'plControllers', 'plServices', 'smart-table']);

/* Controllers Module */
var plControllers = angular.module('plControllers', []);

/* Services Module */
var plServices = angular.module('plServices', []);

/*--------------Routing--------------*/


planning.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    /* Application Record */
      when('/applications/:param', {
        templateUrl: 'templates/applications-record.html',
        controller: 'ApplicationsDetailCtrl'
      }).
      /* About */
      when('/about', {
        templateUrl: 'templates/about.html'
      }).
      /* Applications */
      when('/applications', {
        templateUrl: 'templates/applications.html',
        controller: 'ApplicationsCtrl'
      }).
      /* Everything Else to Home Page */
      otherwise({
        redirectTo: '/applications',
      });
  }]);

/*--------------Controllers--------------*/

/* Applications */
plControllers.controller('ApplicationsCtrl', ['$scope',
  function ($scope) {
  var table = Tabletop.init( { 
                       key: 'https://docs.google.com/spreadsheets/d/1tqMBzBJNfEJNulf4A0_WqJmZbmynqGAnDA_9FQT8IJ8/pubhtml',
                       callback: function(data, tabletop) {
                        $scope.rowCollection = data;
                        $scope.displayedCollection = [].concat($scope.rowCollection);
                        $scope.itemsByPage=10;
                        $scope.$apply()},
                       simpleSheet: true,
                       parseNumbers: true,
                       wanted: ["Plans"]
                   })
   }]);

/* Applications Detail */
plControllers.controller('ApplicationsDetailCtrl', ['$scope', '$routeParams', '$sce',
  function ($scope, $routeParams, $sce) { 
    var table = Tabletop.init( { 
                       key: 'https://docs.google.com/spreadsheets/d/1tqMBzBJNfEJNulf4A0_WqJmZbmynqGAnDA_9FQT8IJ8/pubhtml',
                       callback: function(data, tabletop) {
                        $scope.record = data
                        $scope.location = $sce.trustAsResourceUrl('https://www.google.com/maps/embed/v1/place?q=' + data[0].Locator +  'Lexington KY United States &key=AIzaSyDXqhUx3ZQwPBtAVsXg6tz9N_2yvrRydcQ')
                        $scope.$apply() 
                        },
                       simpleSheet: true,
                       parseNumbers: true,
                       wanted: ["Plans"],
                       query: 'planid = ' + $routeParams.param
                   })

  }]);

/*--------------Filters--------------*/

/* titlecase filter */
planning.filter('titlecase', function () {
  return function (input) {
    var bigwords = /\b(LFUCG|ac|aka|llc|hvac|[a-z]\/[a-z]|i|ii|iii|iv|v|vi|vii|viii|ix)\b/i;
	var smallwords = /\b(an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|to|vs)\b/i;
    var words = input.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i].match(bigwords) !== null) {words[i] = words[i].toUpperCase()}
      else if (words[i].match(smallwords) !== null)	{words[i] = words[i].toLowerCase()}
      else {words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)}
    }
    return words.join(' ');
  }
});