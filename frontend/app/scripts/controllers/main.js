'use strict';

/**
 * @ngdoc function
 * @name moodVisionFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moodVisionFrontendApp
 */
angular.module('moodVisionFrontendApp')
  .controller('MainCtrl', function (SERVER_URL, $scope, Upload, $q, $timeout) {


      $scope.uploadFiles = function(file, errFiles) {
          $scope.results = null;
          $scope.file = file;
          $scope.errFile = errFiles && errFiles[0];
          if (file) {
              file.upload = Upload.upload({
                  url: SERVER_URL+'image/analyze',
                  data: {'image': file}
              });

              file.upload.then(function (response) {
                  $timeout(function () {
                      //file.result = response.data;
                      $scope.results = response.data.responses[0];
                  });
              }, function (response) {
                  if (response.status > 0)
                      $scope.errorMsg = response.status + ': ' + response.data;
              }, function (evt) {
                  file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                  })
          }
      }

              });
