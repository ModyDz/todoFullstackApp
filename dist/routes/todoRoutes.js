"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoControllers_1 = require("../controllers/todoControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.protect, todoControllers_1.newTodo);
router.get("/me", authMiddleware_1.protect, todoControllers_1.getOwnTodos);
router.get("/:username", todoControllers_1.getUserTodos);
router.put("/:id", authMiddleware_1.protect, todoControllers_1.toggleTodo);
router.delete("/:id", authMiddleware_1.protect, todoControllers_1.removeTodo);
exports.default = router;