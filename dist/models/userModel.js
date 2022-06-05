"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// @ts-ignore
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true, unique: true },
    profilePicture: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/dnici9sgk/image/upload/v1654269415/TodoApp/Placeholder_vspnr9.png",
    },
}, { timestamps: true });
userSchema.plugin(mongoose_fuzzy_searching_1.default, { fields: ["username"] });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
