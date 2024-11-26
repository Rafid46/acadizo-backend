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
exports.getUsersById = exports.getUsers = exports.updateUser = exports.createUser = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = __importDefault(require("./user.model"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        console.log(req.body);
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists',
                insertedId: null,
            });
        }
        const data = {
            firstName,
            lastName,
            email,
            password,
            role,
        };
        const user = yield (0, user_service_1.createUserToDb)(data);
        res.status(200).json({
            status: 'success',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
// update user
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const updateData = req.body;
        const updatedUser = yield (0, user_service_1.updateUserToDb)(email, updateData);
        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }
        if (updateData === null || updateData === void 0 ? void 0 : updateData.photoURL) {
            updateData.imageUrl = updateData === null || updateData === void 0 ? void 0 : updateData.photoURL;
        }
        res.status(200).json({
            status: 'success',
            data: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { user } = req.body
//     const result = await createUserToDb(user)
//     res.status(200).json({
//       success: true,
//       message: 'User created successfully',
//       data: result,
//     })
//   } catch (error) {
//     console.error('Error creating user:', error)
//     res.status(400).json({
//       success: false,
//       message: 'Failed to create user!',
//     })
//   }
// }
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.getUsersFomDb)();
    res.status(200).json({
        status: 'success',
        data: user,
    });
});
exports.getUsers = getUsers;
const getUsersById = (req, res, next) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.params;
        console.log('Received email:', email);
        if (!email) {
            res.status(400).json({
                status: 'error',
                message: 'Email is required',
            });
            return resolve(); // Resolve to indicate completion
        }
        try {
            const user = yield (0, user_service_1.getUsersByIDFomDb)(email);
            if (!user) {
                res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                });
                return resolve(); // Resolve for this case as well
            }
            res.status(200).json({
                status: 'success',
                data: user,
            });
            resolve(); // Resolve once the response is sent successfully
        }
        catch (error) {
            next(error); // Pass error to the middleware
            reject(error); // Reject the promise with the error
        }
    }));
};
exports.getUsersById = getUsersById;
