'use strict';

/**
 * @ngdoc overview
 * @name moodVisionFrontendApp
 * @description
 * # moodVisionFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('moodVisionFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
      'ngMaterial',
      'ngFileUpload',
      'angular-loading-bar'
  ])
    .config(function($mdThemingProvider) {


        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink')
            .warnPalette('red')
            .backgroundPalette('grey');
    })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
