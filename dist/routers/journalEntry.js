"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journalEntries_1 = require("../controllers/journalEntries");
const { Router } = express_1.default;
const router = Router();
router.post('/create', journalEntries_1.addJournalEntry);
router.get('/:user_id/:date', journalEntries_1.getJournalEntry);
router.get('/:user_id', journalEntries_1.getAllJournals);
router.delete('/:user_id/:date', journalEntries_1.deleteJournal);
exports.default = router;
//# sourceMappingURL=journalEntry.js.map