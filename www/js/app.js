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
    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    function showConsoleView(type, size, id,callback) { 
   
      $scope.modal.show();
    }
    $scope.clientSideList = [
      { text: "Backbone", value: "bb" },
      { text: "Angular", value: "ng" },
      { text: "Ember", value: "em" },
      { text: "Knockout", value: "ko" }
    ];
    $scope.createContact = function(u) {        
      $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
      $scope.modal.hide();
    };


    requirejs.config({
      baseUrl: 'js',
      paths: {
        engne: 'engne',
        event: 'event',
        util: 'util',
        spoil: 'obj/spoil',
        shot: 'obj/shot',
        plain: 'obj/plain',
        EObject: 'obj/eobject',
        uiComonent: 'obj/uiComonent',
        resource: 'resource'
      }
    })

    requirejs(['engne'], function (Engine) {
      setTimeout(function () {
        var en = new Engine()
        en.Create({
          id: 'myCanvas',
          attachEvent: $scope,
          showConsoleView:showConsoleView
        })
        en.Start()
      }, 1000)
    })

  }])
