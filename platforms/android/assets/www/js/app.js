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
  }).controller('crash', ['$scope',
  function ($scope) {
    setTimeout(function () {
      var en = new Engine( )
      en.Create( {
          id: 'myCanvas',
          shot: shot,
          bullet: bullet,
          bg: bg,
          hp: hp,
          eshot: eshot,
          plainImg: plain,
          head: head,
          enes: [ene1, ene2, ene3, ene4],
          isAndroid: true
        })
      en.Start()
      
      $scope.click = en.BindEvent.click
      $scope.move = en.BindEvent.move

      $scope.mouseDown = en.BindEvent.mouseDown
      $scope.mouseUp = en.BindEvent.mouseUp
      $scope.click = en.BindEvent.click

     // c.onclick = this.BindEvent.click
     // c.onmousemove = this.BindEvent.move
     // body.onmousedown = this.BindEvent.mouseDown
     // body.onmouseup = this.BindEvent.mouseUp


    }, 1000)
  }])
