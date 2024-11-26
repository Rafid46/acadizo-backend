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
exports.handleJoinAcademy = void 0;
const joinAcademy_service_1 = require("./joinAcademy.service");
const handleJoinAcademy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, academyName } = req.body;
        // Validate request payload
        if (!userId || !academyName) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID and Academy Name are required.',
            });
        }
        // Call service to handle logic
        const updatedUser = yield (0, joinAcademy_service_1.joinAcademyForUser)(userId, academyName);
        return res.status(200).json({
            status: 'success',
            message: 'User successfully joined the academy.',
            data: updatedUser,
        });
    }
    catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                status: 'error',
                message: error.message,
            });
        }
        else {
            next(error);
        }
    }
});
exports.handleJoinAcademy = handleJoinAcademy;
