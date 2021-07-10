"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likes_1 = require("../controllers/likes");
const likes_2 = require("../controllers/likes");
const { Router } = express_1.default;
const router = Router();
router.post('/', likes_1.likeTask);
router.delete('/:userId/:taskId', likes_2.unlikeTask);
exports.default = router;
//# sourceMappingURL=likes.js.map