"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const font_1 = require("../controllers/font");
const { Router } = express_1.default;
const router = Router();
router.patch('/:id/toggleOn', font_1.toggleReadableFontOn);
router.patch('/:id/toggleOff', font_1.toggleReadableFontOff);
exports.default = router;
//# sourceMappingURL=readableFont.js.map