(function() {
  'use strict';

  angular.module('NarrowItDownApp', []);
  .controller('NarrowItDownController', NarrowItDownController)
  .factory('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems);
  .constant('ApiBasePath', "//davids-restaurant.herokuapp.com");
    
    

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var vm = this;

    vm.found = [];
    vm.removeMenuItem = removeMenuItem;
    vm.searchMenuItem = searchMenuItem;
    vm.searchTerm = ''

    ////////////

    function searchMenuItem(){
      vm.loading = true;
      vm.message = '';

      return MenuSearchService.getMatchedMenuItems(vm.searchTerm)
      .then(function(data) {
        vm.found = data;

        vm.loading = false;
        if (vm.found.length == 0) {
          vm.message = 'Nothing found!';
        }
      })
      .catch(function(error) {
        console.log(
          'Failed loading information. Error Code: %s, Error Message: %s',
          error.status,
          error.statusText
        );

        vm.loading = false;
        vm.message = 'Error loading information';
      });
    }

    function removeMenuItem(index){
      vm.found.splice(index, 1);
    }

  }

  function foundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        message: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath']
  function MenuSearchService($http, $q, ApiBasePath) {
    var service = {
      getMatchedMenuItems: getMatchedMenuItems
    };

    return service;

    ////////////

    function getMatchedMenuItems(searchTerm) {

      if (searchTerm == '') {
       return $q.when([]);
      }

      return $http.get(ApiBasePath + "/menu_items.json")
        .then(getMenuItemsComplete);

      function getMenuItemsComplete(data) {
        var foundItems = data.data.menu_items;

        foundItems = foundItems.filter(function(item) {
          return item.description.indexOf(searchTerm) !== -1;
        });
        return foundItems || [];
      }

    }

  }
  

})();