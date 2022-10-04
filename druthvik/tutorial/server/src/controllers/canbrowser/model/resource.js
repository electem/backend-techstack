'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
exports.__esModule = true;
exports.Resources = void 0;
var typeorm_1 = require('typeorm');
var product_1 = require('../model/product');
var Resources = /** @class */ (function () {
  function Resources() {}
  __decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)()],
    Resources.prototype,
    'id',
  );
  __decorate([(0, typeorm_1.Column)()], Resources.prototype, 'FirstName');
  __decorate([(0, typeorm_1.Column)()], Resources.prototype, 'LastName');
  __decorate([(0, typeorm_1.Column)()], Resources.prototype, 'Email');
  __decorate(
    [
      (0, typeorm_1.ManyToOne)(
        function (_type) {
          return product_1.Product;
        },
        function (product) {
          return product.resource;
        },
      ),
    ],
    Resources.prototype,
    'Product',
  );
  Resources = __decorate([(0, typeorm_1.Entity)()], Resources);
  return Resources;
})();
exports.Resources = Resources;
