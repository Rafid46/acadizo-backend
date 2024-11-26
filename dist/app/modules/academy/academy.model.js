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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAcademyInDb = void 0;
const mongoose_1 = require("mongoose");
const academySchema = new mongoose_1.Schema({
    academyId: {
        type: String,
        required: true,
        unique: true,
    },
    academyName: {
        type: String,
        required: true,
        unique: true,
    },
    academyDescription: {
        type: String,
    },
    academyNumber: {
        type: String,
    },
    academyMembers: {
        type: [String],
    },
    academyIcon: {
        type: String,
    },
    academyCreatedBy: {
        type: String,
    },
}, {
    timestamps: true,
});
const Academy = (0, mongoose_1.model)('Academy', academySchema);
exports.default = Academy;
const createAcademyInDb = (academyData) => __awaiter(void 0, void 0, void 0, function* () {
    const academy = new Academy(academyData);
    yield academy.save();
    return Academy;
});
exports.createAcademyInDb = createAcademyInDb;
