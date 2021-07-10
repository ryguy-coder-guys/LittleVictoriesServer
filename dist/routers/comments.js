"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_1 = require("../controllers/comments");
const express_1 = __importDefault(require("express"));
const { Router } = express_1.default;
const router = Router();
router.post('/', comments_1.addComment);
router.delete('/:id', comments_1.removeComment);
exports.default = router;
//# sourceMappingURL=comments.js.map