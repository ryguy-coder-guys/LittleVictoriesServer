"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markHabitAsIncomplete = exports.markHabitAsComplete = exports.removeHabit = exports.addHabit = void 0;
const habit_1 = require("../database/models/habit");
const user_1 = require("../database/models/user");
const ptsToLvlUp = 250;
const addHabit = async (req, res) => {
    const { user_id, description, frequency, days_of_week, calendar_date } = req.body;
    try {
        const newHabit = await habit_1.Habit.create({
            user_id,
            description,
            frequency,
            days_of_week,
            calendar_date
        });
        res.status(201).send(newHabit);
    }
    catch (err) {
        console.log('habit submission error: ', err.message);
        res.sendStatus(500);
    }
};
exports.addHabit = addHabit;
const removeHabit = async (req, res) => {
    try {
        const { id } = req.params;
        await habit_1.Habit.destroy({ where: { id } });
        res.send(true);
    }
    catch (err) {
        console.log('error removing habit: ', err);
    }
};
exports.removeHabit = removeHabit;
const markHabitAsComplete = async (req, res) => {
    try {
        const { id } = req.params;
        await habit_1.Habit.update(
        // { is_complete: true, completed_at: new Date() },
        { is_complete: true }, { where: { id } });
        const habit = await habit_1.Habit.findOne({ where: { id } });
        if (!habit) {
            throw new Error(`habit with ${id} isn't in db`);
        }
        const user = await user_1.User.findOne({ where: { id: habit.user_id } });
        if (!user) {
            throw new Error(`user with ${habit.user_id} isn't in db`);
        }
        const currentPoints = user.getDataValue('points');
        const currentLevel = user.getDataValue('level');
        const minutes = 5;
        const returnVal = await user_1.User.update({
            points: currentPoints + minutes < ptsToLvlUp
                ? currentPoints + minutes
                : (currentPoints + minutes) % ptsToLvlUp,
            level: currentPoints + minutes < ptsToLvlUp ? currentLevel : currentLevel + 1,
        }, { where: { id: habit.user_id }, returning: true });
        const updatedUser = await user_1.User.findOne({ where: { id: habit.user_id } });
        res.status(200).send({ habit, points: updatedUser?.points, level: updatedUser?.level });
    }
    catch (err) {
        console.log('error updating habit to compelete: ', err);
        res.sendStatus(500);
    }
};
exports.markHabitAsComplete = markHabitAsComplete;
const markHabitAsIncomplete = async (req, res) => {
    try {
        const { id } = req.params;
        await habit_1.Habit.update({ is_complete: false }, { where: { id } });
        const habit = await habit_1.Habit.findOne({ where: { id } });
        if (!habit) {
            throw new Error(`habit with ${id} isn't in db`);
        }
        const minutes = 5;
        const user = await user_1.User.findOne({ where: { id: habit.user_id } });
        if (!user) {
            throw new Error(`user with ${habit.user_id} isn't in db`);
        }
        const currentPoints = user.getDataValue('points');
        const currentLevel = user.getDataValue('level');
        await user_1.User.update({
            points: currentPoints - minutes < 0
                ? ptsToLvlUp - (minutes - currentPoints)
                : currentPoints - minutes,
            level: currentPoints - minutes < 0 ? currentLevel - 1 : currentLevel,
        }, { where: { id: habit.user_id } });
        const updatedUser = await user_1.User.findOne({ where: { id: habit.user_id } });
        res.status(200).send({ habit, points: updatedUser?.points, level: updatedUser?.level });
    }
    catch (err) {
        console.log('error marking habit as incomplete, error: ', err);
        res.sendStatus(500);
    }
};
exports.markHabitAsIncomplete = markHabitAsIncomplete;
//# sourceMappingURL=habits.js.map