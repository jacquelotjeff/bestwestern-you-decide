// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.utils', 'starter.services', 'starter.controllers'])

    .run(function ($ionicPlatform) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl',
                data: {
                    requireLogin: true
                }
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    }
                },
                data: {
                    requireLogin: false
                }
            })

            .state('app.suggestions', {
                url: '/suggestions',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/suggestions.html',
                        controller: 'SuggestionsCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            })

            .state('app.suggestions_detail', {
                url: '/suggestions/:suggestionId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/suggestion.html',
                        controller: 'SuggestionCtrl'
                    }
                },
                data: {
                    requireLogin: true
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/suggestions');
    })

    // Used to check if the user is logged
    .run(function ($rootScope, $location, $localstorage) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            if ($localstorage.get('currentUser') === 'undefined' && toState.data.requireLogin !== 'undefined') {
                var requireLogin = toState.data.requireLogin;

                if (requireLogin && typeof $localstorage.get('currentUser') === 'undefined') {
                    event.preventDefault();
                    console.log('not authorized');
                    // Redirect to login page
                    $location.path( "/app/login" );
                }
            }
        });

    });