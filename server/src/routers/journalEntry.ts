import express from 'express';
import { addJournalEntry, getJournalEntry, getAllJournals, deleteJournal } from '../controllers/journalEntries';

const { Router } = express;
const router = Router();

router.post('/create', addJournalEntry);
router.get('/:user_id/:date', getJournalEntry);
router.get('/:user_id', getAllJournals)
router.delete('/:user_id/:date', deleteJournal)

export default router;