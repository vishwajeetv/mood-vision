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

    $scope.likelySentimentValues = ['POSSIBLE','LIKELY','VERY_LIKELY'];

    $scope.emotions = ['joyLikelihood','sorrowLikelihood','angerLikelihood','surpriseLikelihood'];

    $scope.isLikely = function (sentiment) {
      if($scope.likelySentimentValues.indexOf(sentiment) > -1)
      {
        return true
      }
      else
      {
        return false;
      }
    };

    $scope.isEmotionPresent = function (result) {
      var emotionPresent = false;
          $scope.emotions.forEach(function(emotion){
            if($scope.isLikely(result[emotion]))
            {
              emotionPresent = true;
            }
          })

      return emotionPresent;

    };

    $scope.howManyTimes = function (sentiment) {
      if($scope.isLikely(sentiment))
      {
        if($scope.likelySentimentValues[0] == sentiment)
        {
          return [1];
        }
        else if($scope.likelySentimentValues[1] == sentiment)
        {
          return [1,2];
        }
        else if($scope.likelySentimentValues[2] == sentiment)
        {
          return [1,2,3];
        }
      }
      else
      {
        return [];
      }

    };
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
                      $scope.results = response.data.responses[0].faceAnnotations;
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
