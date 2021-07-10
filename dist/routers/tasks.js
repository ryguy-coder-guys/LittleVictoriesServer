"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = require("../controllers/tasks");
const { Router } = express_1.default;
const router = Router();
router.get('/', tasks_1.getTasks);
router.post('/', tasks_1.addTask);
router.delete('/:id', tasks_1.removeTask);
router.patch('/:id/complete', tasks_1.markTaskAsComplete);
router.patch('/:id/incomplete', tasks_1.markTaskAsIncomplete);
router.patch('/:id/public', tasks_1.markTaskAsPublic);
router.patch('/:id/private', tasks_1.markTaskAsPrivate);
router.get('/:id', tasks_1.getFeedItems);
exports.default = router;
//# sourceMappingURL=tasks.js.map