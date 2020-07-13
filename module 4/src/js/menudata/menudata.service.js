(function(){
  'use strict';
  angular
    .module('data')
    .constant('MenuAPI', 'https://angular-coursera.herokuapp.com/')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['MenuAPI', '$http'];

    function MenuDataService(MenuAPI, $http) {
      var service = {};

      service.getAllCategories = function() {
        var response = $http({
          method: 'GET',
          url: MenuAPI + 'categories.json'
        });
        return response;
      };

      service.getItemsForCategory = function(categoryShortName) {
        var response = $http({
          medhod: 'GET',
          url: MenuAPI + 'menu_items.json?category=' + categoryShortName
        });
        return response;
      };

      return service;
    }
})();