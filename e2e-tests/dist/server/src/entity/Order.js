"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderInput = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const OrderItem_1 = require("./OrderItem");
let Order = class Order {
    id;
    customerName;
    customerAddr;
    items;
    createdAt;
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Order.prototype, "customerName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "customerAddr", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OrderItem_1.default, (item) => item.order, { cascade: true }),
    (0, type_graphql_1.Field)(() => [OrderItem_1.default]),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
Order = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Order);
let CartItem = class CartItem {
    productId;
    quantity;
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CartItem.prototype, "productId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
CartItem = __decorate([
    (0, type_graphql_1.InputType)()
], CartItem);
let CreateOrderInput = class CreateOrderInput {
    customerName;
    customerAddr;
    items;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "customerName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateOrderInput.prototype, "customerAddr", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, type_graphql_1.Field)(() => [CartItem]),
    __metadata("design:type", Array)
], CreateOrderInput.prototype, "items", void 0);
CreateOrderInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateOrderInput);
exports.CreateOrderInput = CreateOrderInput;
exports.default = Order;
//# sourceMappingURL=Order.js.map