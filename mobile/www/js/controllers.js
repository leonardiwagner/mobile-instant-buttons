angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.categories = buttons.categories;
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
    var categoryId = $stateParams.categoryId;
    $scope.soundButtons = buttons.categories.filter(function(category){
      return category.id == categoryId;
    })[0].items;



    $scope.playSound = function(){
      var thisButton = this.soundButton;

      if(thisButton.status && thisButton.status.indexOf('playing') !== -1){
        stopSoundOnDevice();
        setAllButtonsNormalAgain();
      }else{
        setOtherButtonsUnavaiable(thisButton);
        playSoundOnDevice("asset/" + thisButton.url, function(){
          stopSoundOnDevice();
          setAllButtonsNormalAgain();
        });
      }

    }

    function setOtherButtonsUnavaiable(playingButton){
      $scope.soundButtons.map(function(button){
        if(button.title != playingButton.title){
          button.status = "unavaiable";
        }
      });
      playingButton.status = "playing ion-stop";;
    }

    function setAllButtonsNormalAgain(){
      $scope.soundButtons.map(function(button){
        button.status = "";
      });
      $scope.$apply();
    }

    var isDevice = window.device != undefined;
    var audio = null;
    function playSoundOnDevice(soundUrl, finishCallback){
      if(isDevice){

      }else{
        if(audio != null){
          audio.pause();
        }
        audio = new Audio(soundUrl);
        audio.load();
        audio.play();
        audio.addEventListener("ended", finishCallback, false);
      }
    }

    function stopSoundOnDevice(){
      if(isDevice){

      }else{
          audio.pause();
          audio = null;
      }
    }
});
