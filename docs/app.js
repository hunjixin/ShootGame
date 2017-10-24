// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('gameDem',['ionic'])

  .run(function () {

  }).controller('crash', ['$scope',
  function ($scope) {
    requirejs.config({
      baseUrl: window.baseUrl+'js',
      paths: {
        engne: 'engne',
        event: 'lib/event',
        util: 'util',
        spoil: 'lib/spoil',
        shot: 'lib/shot',
        plain: 'lib/plain',
        eShape: 'lib/eShape',
        Debug:'lib/debug',
        context:'context',
        uiComonent: 'lib/uiComonent',
        resource: 'resource'
      }
    })

    requirejs(['engne'], function (Engine) {
      setTimeout(function () {
        var en = new Engine()
        en.Create({
          id: 'myCanvas',
          attachEvent: $scope,
          showConsoleView:function(){console.log('not support')},
          initConsoleView:function(){console.log('not support')}
        })
        en.Start()
      }, 1000)
    })

  }])
