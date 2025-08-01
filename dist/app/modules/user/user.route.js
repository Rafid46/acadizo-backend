"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const joinAcademy_controller_1 = require("./joinAcademy.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.getUsers);
router.get('/:email', user_controller_1.getUsersById);
router.post('/create-user', user_controller_1.createUser);
router.put('/update-user/:email', user_controller_1.updateUser);
router.post('/join-academy', joinAcademy_controller_1.handleJoinAcademy);
exports.default = router;
