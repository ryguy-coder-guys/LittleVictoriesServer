"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJournal = exports.addJournalEntry = exports.getAllJournals = exports.getJournalEntry = void 0;
const journalEntry_1 = require("../database/models/journalEntry");
const getJournalEntry = async (req, res) => {
    const { user_id, date } = req.params;
    try {
        const journalEntry = await journalEntry_1.JournalEntry.findOne({
            where: { date: date, user_id: user_id }
        });
        res.status(200).send(journalEntry);
    }
    catch (err) {
        console.log('error fetching journal Entry', err);
        res.sendStatus(500);
    }
};
exports.getJournalEntry = getJournalEntry;
const getAllJournals = async (req, res) => {
    const { user_id } = req.params;
    try {
        const allJournals = await journalEntry_1.JournalEntry.findAll({
            where: { user_id: user_id }
        });
        res.status(200).send(allJournals);
    }
    catch (err) {
        console.log('error fetching journal Entry', err);
        res.sendStatus(500);
    }
};
exports.getAllJournals = getAllJournals;
const addJournalEntry = async (req, res) => {
    const { user_id, content, date } = req.body;
    if (content === '') {
        try {
            await journalEntry_1.JournalEntry.destroy({ where: { date: date, user_id: user_id } });
            res.sendStatus(201);
        }
        catch (err) {
            console.log('error deleting entry', err);
            res.sendStatus(500);
        }
    }
    else {
        // check for already existing journalEntry
        const journalEntry = await journalEntry_1.JournalEntry.findOne({ where: { date: date } });
        // if it exists, edit the existing one's content
        if (journalEntry) {
            const updatedEntry = await journalEntry.update({ content: content });
            res.sendStatus(201);
        }
        else {
            // if it does not, create it
            try {
                await journalEntry_1.JournalEntry.create({
                    user_id,
                    content,
                    date
                });
                res.sendStatus(201);
            }
            catch (err) {
                console.log('entry submission error', err);
                res.sendStatus(500);
            }
        }
    }
};
exports.addJournalEntry = addJournalEntry;
const deleteJournal = async (req, res) => {
    const { user_id, date } = req.params;
    try {
        await journalEntry_1.JournalEntry.destroy({ where: { user_id, date } });
        res.sendStatus(201);
    }
    catch (err) {
        console.log('error deleting entry', err);
        res.sendStatus(500);
    }
};
exports.deleteJournal = deleteJournal;
//# sourceMappingURL=journalEntries.js.map