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
exports.removeTodo = exports.toggleTodo = exports.getUserTodos = exports.getOwnTodos = exports.newTodo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const todoModel_1 = __importDefault(require("../models/todoModel"));
exports.newTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user.id);
    if (user) {
        const todo = yield todoModel_1.default.create({ text: req.body.text, user: user.id });
        res.json({ todo });
    }
}));
exports.getOwnTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield todoModel_1.default.find({ user: req.user.id });
    res.json(todos);
}));
exports.getUserTodos = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ username: req.params.username });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const todos = yield todoModel_1.default.find({ user: user.id });
    res.json({ todos, username: user.displayName });
}));
exports.toggleTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todoModel_1.default.findById(req.params.id);
    if (req.user.id === todo.user.toString()) {
        const updatedTodo = yield todoModel_1.default.findByIdAndUpdate(req.params.id, {
            completed: !todo.completed,
        }, { new: true });
        res.json({ updatedTodo });
    }
    else {
        res.status(400);
        throw new Error("Not allowed to update this todo");
    }
}));
exports.removeTodo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield todoModel_1.default.findById(req.params.id);
    if (req.user.id === todo.user.toString()) {
        todo.remove();
        res.json({ message: "Todo has been successfully removed" });
    }
}));
