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
exports.getAcademyFomDb = exports.createAcademyToDb = void 0;
const academy_model_1 = __importDefault(require("./academy.model"));
const academy_utils_1 = require("./academy.utils");
const createAcademyToDb = (academy) => __awaiter(void 0, void 0, void 0, function* () {
    const academyId = yield (0, academy_utils_1.generateAcademyId)();
    academy.academyId = academyId;
    const createAcademy = yield academy_model_1.default.create(academy);
    return createAcademy;
});
exports.createAcademyToDb = createAcademyToDb;
const getAcademyFomDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const academy = yield academy_model_1.default.find();
    return academy;
});
exports.getAcademyFomDb = getAcademyFomDb;
