"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const habits_1 = require("../controllers/habits");
const { Router } = express_1.default;
const router = Router();
router.post('/', habits_1.addHabit);
router.delete('/:id', habits_1.removeHabit);
router.patch('/:id/complete', habits_1.markHabitAsComplete);
router.patch('/:id/incomplete', habits_1.markHabitAsIncomplete);
exports.default = router;
//# sourceMappingURL=habits.js.map