import { Habit } from '../database/models/habit';
import { getDay, format } from 'date-fns';

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
    const currentDayOfWk: number = getDay(new Date());
    const days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
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
    const currentDateOfMonth = format(new Date(), 'd');
    Habit.update(
      { is_complete: false },
      { where: { calendar_date: parseInt(currentDateOfMonth), frequency: 'monthly' } }
    );
  } catch (err) {
    console.warn('error updating monthly habits: ', err);
  }
}

resetDailyHabits();
resetWeeklyHabits();
resetMonthlyHabits();