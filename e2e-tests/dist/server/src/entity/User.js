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
exports.getSafeAttributes = exports.verifyPassword = exports.hashPassword = exports.LoginInput = void 0;
const typeorm_1 = require("typeorm");
const argon2_1 = require("argon2");
const type_graphql_1 = require("type-graphql");
let User = class User {
    id;
    email;
    password;
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], User);
let LoginInput = class LoginInput {
    email;
    password;
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;
// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2_1.argon2id,
};
const hashPassword = async (plainPassword) => await (0, argon2_1.hash)(plainPassword, hashingOptions);
exports.hashPassword = hashPassword;
const verifyPassword = async (plainPassword, hashedPassword) => await (0, argon2_1.verify)(hashedPassword, plainPassword, hashingOptions);
exports.verifyPassword = verifyPassword;
const getSafeAttributes = (user) => ({
    ...user,
    password: undefined,
});
exports.getSafeAttributes = getSafeAttributes;
exports.default = User;
//# sourceMappingURL=User.js.map