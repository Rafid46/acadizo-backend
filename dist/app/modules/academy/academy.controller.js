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
exports.getAcademy = exports.createAcademy = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const academy_model_1 = __importDefault(require("./academy.model"));
const academy_service_1 = require("./academy.service");
// export const createAcademy = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   try {
//     const {
//       academyName,
//       academyDescription,
//       academyNumber,
//       academyMembers,
//       academyIcon,
//       academyCreatedBy,
//     } = req.body
//     console.log(req.body)
//     const existingAcademy = await Academy.findOne({ academyName })
//     if (existingAcademy) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Academy already exist',
//         insertedId: null,
//       })
//     }
//     const data: IAcademy = {
//       academyName,
//       academyDescription,
//       academyNumber,
//       academyMembers,
//       academyIcon,
//       academyCreatedBy,
//     } as IAcademy
//     const academy = await createAcademyToDb(data)
//     if (academy) {
//       await User.findByIdAndUpdate(
//         academyCreatedBy, // The user's ID
//         { createdAcademy: academy.academyName },
//         { new: true }, // Return the updated document
//       )
//     }
//     res.status(200).json({
//       status: 'success',
//       data: academy,
//     })
//   } catch (error) {
//     next(error)
//   }
// }
const createAcademy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { academyName, academyDescription, academyNumber, academyMembers, academyIcon, academyCreatedBy, // Custom identifier like email or user ID
         } = req.body;
        // Check if the academy already exists
        const existingAcademy = yield academy_model_1.default.findOne({ academyName });
        if (existingAcademy) {
            return res.status(400).json({
                status: 'error',
                message: 'Academy already exists',
                insertedId: null,
            });
        }
        // Create the academy in the database
        const data = {
            academyName,
            academyDescription,
            academyNumber,
            academyMembers,
            academyIcon,
            academyCreatedBy,
        };
        const academy = yield (0, academy_service_1.createAcademyToDb)(data);
        // If academy creation is successful, update the user's data
        if (academy) {
            // Update the user using a custom field like email or id
            const user = yield user_model_1.default.findOneAndUpdate({ email: academyCreatedBy }, // Adjust the field based on your logic (e.g., { id: academyCreatedBy })
            { createdAcademy: academy === null || academy === void 0 ? void 0 : academy.academyName }, { new: true });
        }
        // Respond with the academy data
        res.status(200).json({
            status: 'success',
            data: academy,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAcademy = createAcademy;
const getAcademy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const academy = yield (0, academy_service_1.getAcademyFomDb)();
    res.status(200).json({
        status: 'success',
        data: academy,
    });
});
exports.getAcademy = getAcademy;
