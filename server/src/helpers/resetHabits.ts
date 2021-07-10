import { Habit } from '../database/models/habit';
import { format, getDay, getDaysInMonth } from 'date-fns';
import sequelize from 'sequelize';

const resetDailyHabits = async () => {
  try {
    Habit.update(
      { is_complete: false },
      { where: { frequency: 'daily' } }
    );
  } catch (err) {
    console.warn('error updating daily habits: ', err);
  }
};

const resetWeeklyHabits = async () => {
  try {
    const habits = await Habit.findAll();
    const currentDayOfWk = getDay(new Date());
    const days = {
      0: 'Su',
      1: 'M',
      2: 'Tu',
      3: 'W',
      4: 'Th',
      5: 'F',
      6: 'Sa'
    }
    habits.map(habit => {
      // currently set to reset each day newly due
      if (habit.days_of_week.includes(days[currentDayOfWk])) {
        Habit.update(
          { is_complete: false },
          { where: { id: habit.id } }
        );
      }
    });
  } catch (err) {
    console.warn('error updating weekly habits: ', err);
  }
}

const resetMonthlyHabits = async () => {
  try {
    const habits = await Habit.findAll();
    const currentDateOfMonth = parseInt(format(new Date(), 'd'));
    // if currentDateOfMonth is 28, 29, or 30, check how many days are in the month
    if (currentDateOfMonth >= 28 && currentDateOfMonth < 31) {
      const daysThisMonth = getDaysInMonth(new Date());
      // if this is the last day of the month, grab habits from days that won't occur this month
      if (currentDateOfMonth === daysThisMonth && currentDateOfMonth === 28) {
        habits.map(habit => {
          if (habit.frequency === 'monthly') {
            Habit.update(
              { is_complete: false },
              { where: {[sequelize.Op.or]: [{calendar_date: currentDateOfMonth}, {calendar_date: 29}, {calendar_date: 30}, {calendar_date: 31}] } }
            );
          }
        });
      } else if (currentDateOfMonth === daysThisMonth && currentDateOfMonth === 29) {
        habits.map(habit => {
          if (habit.frequency === 'monthly') {
            Habit.update(
              { is_complete: false },
              { where: {[sequelize.Op.or]: [{calendar_date: currentDateOfMonth}, {calendar_date: 30}, {calendar_date: 31}] } }
            );
          }
        });
      } else if (currentDateOfMonth === daysThisMonth && currentDateOfMonth === 30) {
        habits.map(habit => {
          if (habit.frequency === 'monthly') {
            Habit.update(
              { is_complete: false },
              { where: {[sequelize.Op.or]: [{calendar_date: currentDateOfMonth}, {calendar_date: 31}] } }
            );
          }
        });
      }
    } else {
      habits.map(habit => {
        if (habit.frequency === 'monthly') {
          Habit.update(
            { is_complete: false },
            { where: { calendar_date: currentDateOfMonth } }
          );
        }
      });
    }
  } catch (err) {
    console.warn('error updating monthly habits: ', err);
  }
}

resetDailyHabits();
resetWeeklyHabits();
resetMonthlyHabits();