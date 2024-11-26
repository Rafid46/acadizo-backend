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
exports.getUsersByIDFomDb = exports.getUsersFomDb = exports.updateUserToDb = exports.createUserToDb = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const index_1 = __importDefault(require("../../../config/index"));
const user_utils_1 = require("./user.utils");
// export const createUserToDb = async (payload: IUser) => {
//   const user = await new User(payload)
//   await user.save()
//   return user
// }
const createUserToDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, user_utils_1.generateUserId)();
    // default password for student
    user.id = id;
    if (!user.password) {
        user.password = index_1.default.default_student_pass;
    }
    const createdUser = yield user_model_1.default.create(user);
    if (!exports.createUserToDb) {
        throw new Error('Failed to create new user!');
    }
    return createdUser;
});
exports.createUserToDb = createUserToDb;
const updateUserToDb = (email, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Updating user with id:', email);
    console.log('Update data:', updateData);
    const updatedNewUser = yield user_model_1.default.findOneAndUpdate({ email: email }, { $set: updateData }, {
        new: true,
    });
    return updatedNewUser;
});
exports.updateUserToDb = updateUserToDb;
const getUsersFomDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    return users;
});
exports.getUsersFomDb = getUsersFomDb;
const getUsersByIDFomDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: payload }); // Query the user by email
        return user; // Return user if found, null if not found
    }
    catch (error) {
        throw new Error('Error fetching user from the database');
    }
});
exports.getUsersByIDFomDb = getUsersByIDFomDb;
