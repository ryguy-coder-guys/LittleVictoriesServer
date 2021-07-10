"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lists_1 = require("../controllers/lists");
const { Router } = express_1.default;
const router = Router();
router.get('/', lists_1.getLists);
router.post('/', lists_1.addList);
router.delete('/:id', lists_1.removeList);
exports.default = router;
//# sourceMappingURL=lists.js.map