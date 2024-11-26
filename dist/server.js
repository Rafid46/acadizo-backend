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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
dotenv_1.default.config();
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j1gssm8.mongodb.net/acadizo?retryWrites=true&w=majority`;
// Connect to MongoDB
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log('MongoDB connected successfully');
            // Start Server
            app_1.default.listen(config_1.default.port, () => {
                console.log(`Application listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1); // Exit process with failure
        }
    });
}
connectDB();
