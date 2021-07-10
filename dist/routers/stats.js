"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stats_1 = require("../controllers/stats");
const { Router } = express_1.default;
const router = Router();
router.post('/', stats_1.addStats);
exports.default = router;
//# sourceMappingURL=stats.js.map