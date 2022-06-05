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
exports.getUser = exports.searchUsers = exports.uploadUserPicture = exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    // Validates email
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(emailRegex)) {
        res.status(400);
        throw new Error("Please enter a valid email address");
    }
    // Validates username
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;
    if (!username.match(usernameRegex)) {
        res.status(400);
        throw new Error("Invalid username");
    }
    if (username.length < 6) {
        res.status(400);
        throw new Error("Username too short");
    }
    if (password.length < 8) {
        res.status(400);
        throw new Error("Password too short");
    }
    const existingUser = yield userModel_1.default.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email: email.toLowerCase() },
        ],
    });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }
    // Password encryption
    const salt = yield bcrypt_1.default.genSalt();
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const newUser = yield userModel_1.default.create({
        displayName: username,
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
    });
    if (newUser) {
        res.json({
            token: generateToken(newUser._id),
            username: newUser.displayName,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
        });
    }
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const loggedUser = yield userModel_1.default.findOne({
        $or: [
            { username: username.toLowerCase() },
            { email: username.toLowerCase() },
        ],
    });
    if (loggedUser && (yield bcrypt_1.default.compare(password, loggedUser.password))) {
        res.json({
            token: generateToken(loggedUser._id),
            username: loggedUser.displayName,
            email: loggedUser.email,
            profilePicture: loggedUser.profilePicture,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
}));
exports.uploadUserPicture = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { picture } = req.body;
    const LoggedUser = yield userModel_1.default.findById(req.user.id);
    if (LoggedUser) {
        const updatedUser = yield userModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, { profilePicture: picture }, { new: true });
        res.json({
            token: generateToken(updatedUser._id),
            username: updatedUser.displayName,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
        });
    }
}));
exports.searchUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.q) {
        // @ts-ignore
        const filteredUsers = yield userModel_1.default.fuzzySearch(req.query.q).select([
            "displayName",
            "profilePicture",
            "-_id",
            "confidenceScore",
        ]);
        res.json(filteredUsers);
    }
}));
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ username: req.params.username }).select([
        "displayName",
        "profilePicture",
    ]);
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    res.status(200).json(user);
}));
function generateToken(id) {
    if (process.env.JWT_SECRET) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
    }
    else {
        throw new Error("Secret key not provided");
    }
}
