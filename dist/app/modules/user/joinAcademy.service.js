"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinAcademyForUser = void 0;
const academy_model_1 = __importDefault(require("../academy/academy.model"));
const user_model_1 = __importDefault(require("./user.model"));
const joinAcademyForUser = (userId, academyName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Check if the academy exists
    const academy = yield (academy_model_1.default === null || academy_model_1.default === void 0 ? void 0 : academy_model_1.default.findOne({ academyName }));
    if (!academy) {
        throw { status: 404, message: 'Academy not found' };
    }
    // Update the user's academy field
    const updatedUser = yield user_model_1.default.findOneAndUpdate({ id: userId }, { academyName: academyName }, { new: true });
    if (!updatedUser) {
        throw { status: 404, message: 'User not found' };
    }
    // Ensure academyMembers is defined as an empty array if it's undefined
    if (!((_a = academy.academyMembers) === null || _a === void 0 ? void 0 : _a.includes(userId))) {
        academy.academyMembers = (_b = academy.academyMembers) !== null && _b !== void 0 ? _b : []; // Initialize as empty array if undefined
        academy.academyMembers.push(userId);
        yield academy.save(); // Don't forget to save the academy
    }
});
exports.joinAcademyForUser = joinAcademyForUser;
