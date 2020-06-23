(function () {
    'use strict';

    angular.module('CheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListService', ShoppingListService);

    ToBuyController.$inject = ['ShoppingListService'];
    function ToBuyController (ShoppingListService) {
        var tobuy = this;

        tobuy.items = ShoppingListService.getItemstobuy();

        tobuy.boughtItem = function (itemIndex) {
            ShoppingListService.boughtItem(itemIndex);
        };
    };

    AlreadyBoughtController.$inject = ['ShoppingListService'];
    function AlreadyBoughtController (ShoppingListService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListService.getItemsBought();
    };

    function ShoppingListService() {
        var service = this;

        var itemstobuy = [];
        var itemsBought = [];

        itemstobuy = InitialiseBuyList();

        service.getItemstobuy = function () {
            return itemstobuy;
        };

        service.getItemsBought = function () {
            return itemsBought;
        };

        service.boughtItem = function (itemIndex) {
            var removedItems = itemstobuy.splice(itemIndex,1);
            itemsBought.push(removedItems[0]);
        };
    };

    function InitialiseBuyList() {
        return [{name: "Cookies", quantity: "3 Bags"},
                {name: "Chips", quantity: "4 Bags"},
                {name: "Cold Drinks", quantity: "3 Bottles"},
                {name: "Cheese Slice", quantity: "2 packets"},
                {name: "Snickers", quantity: "5 bars"}];
    };

})();