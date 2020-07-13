(function(){
  'use strict';
  angular
    .module('MenuApp')
    .component('categories', {
      templateUrl: './src/js/categories/categories.template.html',
        bindings: {
          items: '<'
        }
    });
})();