type frequencyRateType = 'daily' | 'weekly' | 'monthly';

export interface AddHabitReqBody  {
  user_id: string;
  description: string;
  frequency: frequencyRateType;
  days_of_week: string;
  calendar_date: number;
}