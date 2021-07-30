"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStats = void 0;
const stat_1 = require("../database/models/stat");
exports.addStats = async (req, res) => {
    const { user_id, sleep_hours, eaten_well, exercised, notes, date, mood } = req.body;
    try {
        const stats = await stat_1.UserStat.create({
            user_id,
            sleep_hours,
            eaten_well,
            exercised,
            notes,
            mood,
            date
        });
        res.status(201).send(stats);
    }
    catch (err) {
        console.log('stat submission error: ', err.message);
        res.sendStatus(500);
    }
};
//# sourceMappingURL=stats.js.map