/*
 * @ngdoc module
 * @name material.services.theming
 * @description InterimElement
 */

angular.module('material.services.theming', [
])
.directive('mdTheme', [
  ThemingDirective
])
.factory('$mdTheming', [
  Theming
]);

/*
 * @ngdoc service
 * @name $mdTheming
 *
 * @description
 *
 * Service that makes an element apply theming related classes to itself.
 *
 * ```js
 * app.directive('myFancyDirective', function($mdTheming) {
 *   return {
 *     restrict: 'e',
 *     link: function(scope, el, attrs) {
 *       $mdTheming(el);
 *     }
 *   };
 * });
 * ```
 * @param {el=} element to apply theming to
 *
 * @returns {$$interimElement.$service}
 *
 */

function Theming() {
  return function applyTheme(scope, el) {
    // Allow us to be invoked via a linking function signature.
    if (el === undefined) { el = scope; }

    var ctrl = el.controller('mdTheme');

    var theme = ctrl && ctrl.$mdTheme ? ctrl.$mdTheme : 'default';

    el.addClass('md-' + theme + '-theme');
  };
}

function ThemingDirective($mdTheming) {
  return {
    require: 'mdTheme',
    controller: function ThemeController() {
      this.$setTheme = function(theme) {
        this.$mdTheme = theme;
      };
    },
    link: function(scope, el, attrs, ctrl) {
      ctrl.$setTheme(attrs.mdTheme);
      attrs.$observe('mdTheme', ctrl.$setTheme);
    }
  };
}
