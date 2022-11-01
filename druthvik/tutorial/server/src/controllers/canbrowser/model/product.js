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
exports.Product = void 0;
var typeorm_1 = require('typeorm');
var resource_1 = require('../model/resource');
var Product = /** @class */ (function () {
  function Product() {}
  __decorate(
    [(0, typeorm_1.PrimaryGeneratedColumn)()],
    Product.prototype,
    'id',
  );
  __decorate([(0, typeorm_1.Column)()], Product.prototype, 'name');
  __decorate(
    [
      (0, typeorm_1.OneToMany)(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function (_type) {
          return resource_1.Resources;
        },
        function (resource) {
          return resource.Product;
        },
      ),
      (0, typeorm_1.JoinColumn)(),
    ],
    Product.prototype,
    'resource',
  );
  Product = __decorate([(0, typeorm_1.Entity)()], Product);
  return Product;
})();
exports.Product = Product;
