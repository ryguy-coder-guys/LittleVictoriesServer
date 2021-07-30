"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const achievements_1 = require("./../controllers/achievements");
const { Router } = express_1.default;
const router = Router();
router.post('/', achievements_1.addAchievement);
router.post('/comment', achievements_1.addComment);
router.delete('/comment/:commentId', achievements_1.removeComment);
router.post('/like', achievements_1.addLike);
router.delete('/like/:userId/:achievementId', achievements_1.removeLike);
exports.default = router;
//# sourceMappingURL=achievements.js.map