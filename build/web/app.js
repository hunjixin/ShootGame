// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('gameDem',['ionic'])

  .run(function () {

  }).controller('crash', ['$scope',
  function ($scope) {
    document.onkeyup=function(param){
      $scope.keyUp(param)
    }

    $scope.keyUp=document.keyUp;

    var en = new ShotGame()
    en.Create({
      id: 'myCanvas',
      attachEvent: $scope,
      showConsoleView:function(){console.log('not support')},
      initConsoleView:function(){console.log('not support')}
    })
    en.Start()

  }])
