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

    function showConsoleView(type, size, id,callback) { 
      $scope.id = id; 
      var modalInstance = $ionicModal.open({ 
        templateUrl: 'modal.html', //template:'html元素模板', 
        controller: function(){
          callback()
        }, // 初始化模态范围 
        size: size, //大小配置 
        scope: '一个作用域为模态的内容使用（$modal会创建一个当前作用域的子作用域,scope可有可无）默认为$rootScope', 
        resolve: { 
          items: function() { 
            return $scope.id; //向模态框控制器中传值 
          } 
        } ,
        background: '', //控制背景，true(有) or false(无)，static背景存在，但是点击模态窗口之外，模态窗不关闭 
        keyboard: '', //按下Esc时，模态对话框是否关闭，默认为ture 
        windowClass: '' //指定一个class并被添加到模态窗口中 
      }); 
      
      modalInstance.result.then(function(selectedItem) { //模态框关闭后返回函数，selectedItem为返回值 
      
      }) 
    }

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
