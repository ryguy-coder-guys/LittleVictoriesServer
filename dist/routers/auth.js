"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const { Router } = express_1.default;
const router = Router();
router.post('/register', auth_1.registerUser);
router.post('/login', auth_1.loginUser);
router.get('/users/:userId', auth_1.users);
router.delete('/:id', auth_1.removeUser);
exports.default = router;
//# sourceMappingURL=auth.js.map