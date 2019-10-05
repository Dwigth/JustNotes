"use strict";
/**
@description: Esta clase representa un modelo SEQUELIZE.
*/
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
const sequelize_typescript_1 = require("sequelize-typescript");
let M_NOTA = class M_NOTA extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], M_NOTA.prototype, "id_nota", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], M_NOTA.prototype, "titulo", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], M_NOTA.prototype, "contenido", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], M_NOTA.prototype, "lista", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], M_NOTA.prototype, "id_usuario", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], M_NOTA.prototype, "color", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], M_NOTA.prototype, "fecha_creacion", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], M_NOTA.prototype, "fecha_modificacion", void 0);
M_NOTA = __decorate([
    sequelize_typescript_1.Table({
        tableName: 'nota'
    })
], M_NOTA);
exports.M_NOTA = M_NOTA;
