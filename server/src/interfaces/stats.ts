type moodType = 'great' | 'good' | 'ok' | 'bad' | 'terrible';

export interface AddStatsReqBody {
  user_id: string;
  sleep_hours: number;
  eaten_well: boolean;
  exercised: boolean;
  notes: string;
  mood: moodType;
  date: string;
}