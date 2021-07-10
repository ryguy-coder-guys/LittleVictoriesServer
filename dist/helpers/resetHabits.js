"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const habit_1 = require("../database/models/habit");
const date_fns_1 = require("date-fns");
const sequelize_1 = __importDefault(require("sequelize"));
const resetDailyHabits = async () => {
    try {
        habit_1.Habit.update({ is_complete: false }, { where: { frequency: 'daily' } });
    }
    catch (err) {
        console.warn('error updating daily habits: ', err);
    }
};
const resetWeeklyHabits = async () => {
    try {
        const habits = await habit_1.Habit.findAll();
        const currentDayOfWk = date_fns_1.getDay(new Date());
        const days = {
            0: 'Su',
            1: 'M',
            2: 'Tu',
            3: 'W',
            4: 'Th',
            5: 'F',
            6: 'Sa'
        };
        habits.map(habit => {
            // currently set to reset each day newly due
            if (habit.days_of_week.includes(days[currentDayOfWk])) {
                habit_1.Habit.update({ is_complete: false }, { where: { id: habit.id } });
            }
        });
    }
    catch (err) {
        console.warn('error updating weekly habits: ', err);
    }
};
const resetMonthlyHabits = async () => {
    try {
        const habits = await habit_1.Habit.findAll();
        const currentDateOfMonth = parseInt(date_fns_1.format(new Date(), 'd'));
        // if currentDateOfMonth is 28, 29, or 30, check how many days are in the month
        if (currentDateOfMonth >= 28 && currentDateOfMonth < 31) {
            const daysThisMonth = date_fns_1.getDaysInMonth(new Date());
            // if this is the last day of the month, grab habits from days that won't occur this month
            if (currentDateOfMonth === daysThisMonth && currentDateOfMonth === 28) {
                habits.map(habit => {
                    if (habit.frequency === 'monthly') {
                        habit_1.Habit.update({ is_complete: false }, { where: { [sequelize_1.default.Op.or]: [{ calendar_date: currentDateOfMonth }, { calendar_date: 29 }, { calendar_date: 30 }, { calendar_date: 31 }] } });
                    }
                });
            }
            else if (currentDateOfMonth === daysThisMonth && currentDateOfMonth === 29) {
                habits.map(habit => {
                    if (habit.frequency === 'monthly') {
                        habit_1.Habit.update({ is_complete: false }, { where: { [sequelize_1.default.Op.or]: [{ calendar_date: currentDateOfMonth }, { calendar_date: 30 }, { calendar_date: 31 }] } });
                    }
                });
            }
            else if (currentDateOfMonth === daysThisMonth && currentDateOfMonth === 30) {
                habits.map(habit => {
                    if (habit.frequency === 'monthly') {
                        habit_1.Habit.update({ is_complete: false }, { where: { [sequelize_1.default.Op.or]: [{ calendar_date: currentDateOfMonth }, { calendar_date: 31 }] } });
                    }
                });
            }
        }
        else {
            habits.map(habit => {
                if (habit.frequency === 'monthly') {
                    habit_1.Habit.update({ is_complete: false }, { where: { calendar_date: currentDateOfMonth } });
                }
            });
        }
    }
    catch (err) {
        console.warn('error updating monthly habits: ', err);
    }
};
resetDailyHabits();
resetWeeklyHabits();
resetMonthlyHabits();
//# sourceMappingURL=resetHabits.js.map