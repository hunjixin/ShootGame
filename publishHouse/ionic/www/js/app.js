// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true)
      }
      if (window.StatusBar) {
        StatusBar.styleDefault()
      }
    })
  }).controller('crash', ['$scope','$ionicModal' ,
  function ($scope,$ionicModal) {

    function initConsoleView(context)
    {
      $scope.context=context
      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
    }
    
    function showConsoleView(callback) { 
      $scope.modal.show();
      $scope.showCallback=callback
    }
    $scope.confirm=function(){

    }
    $scope.cancel=function(){
      $scope.modal.hide();
      $scope.showCallback.apply($scope.context)
    }

    requirejs.config({
      baseUrl: window.baseUrl+'js',
      paths: {
        context:'context',
        Debug:'lib/debug',
        util: 'util',
        resource: 'resource',
        event: 'lib/event',
        eShape: 'lib/eShape',
        spoil: 'lib/spoil',
        shot: 'lib/shot',
        plain: 'lib/plain',
        uiComonent: 'lib/uiComonent',
        engne: 'engne',
        lodash: 'https://cdn.bootcss.com/lodash.js/4.17.4/lodash',
      },
      shim: {
       
       }
    })

    requirejs(['engne'], function (Engine) {
      var en = new Engine()
      en.Create({
        id: 'myCanvas',
        attachEvent: $scope,
        showConsoleView:showConsoleView,
        initConsoleView:initConsoleView
      })
      en.Start()
    })

  }])
