"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friends_1 = require("../controllers/friends");
const { Router } = express_1.default;
const router = Router();
router.post('/', friends_1.addFriend);
router.delete('/:userId/:friendId', friends_1.removeFriend);
exports.default = router;
//# sourceMappingURL=friends.js.map