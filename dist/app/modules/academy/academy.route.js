"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academy_controller_1 = require("./academy.controller");
const router = express_1.default.Router();
router.get('/academyList', academy_controller_1.getAcademy);
router.post('/createAcademy', academy_controller_1.createAcademy);
exports.default = router;
