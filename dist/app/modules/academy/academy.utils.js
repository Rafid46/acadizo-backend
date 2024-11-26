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
exports.generateAcademyId = exports.findLastAcademyId = void 0;
const academy_model_1 = __importDefault(require("./academy.model"));
const findLastAcademyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAcademy = yield academy_model_1.default.findOne({}, { academyId: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastAcademy === null || lastAcademy === void 0 ? void 0 : lastAcademy.academyId;
});
exports.findLastAcademyId = findLastAcademyId;
const generateAcademyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAcademyId)()) || (0).toString().padStart(3, '0');
    const incrementId = (parseInt(currentId) + 1).toString().padStart(3, '0');
    return incrementId;
});
exports.generateAcademyId = generateAcademyId;
