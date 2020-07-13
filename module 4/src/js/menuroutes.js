(function(){
  'use strict';
  angular
    .module('MenuApp')
    .config(RoutesConfiguration);

    RoutesConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfiguration($stateProvider, $urlRouterProvider) {
      // Here goes your code
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'pages/home.html'
        })
        .state('categories', {
          url: '/categories',
          templateUrl: 'pages/categories.html',
          controller: 'CategoriesController',
          controllerAs: 'categoriesCtrl'
        })
        .state('categories.item', {
          url: '/{item}',
          templateUrl: 'pages/items-list.html',
          controller: 'ItemsController',
          controllerAs: 'itemsCtrl',
          params: {
            item: null,
            category: null
          }
        });

    }
})();