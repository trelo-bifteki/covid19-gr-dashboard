import DailyCoronaData from '@/types/DailyCoronaData';

export interface RootState {
  data: Record<string, DailyCoronaData>;
  currentDailyData: DailyCoronaData;
  isLoading: boolean;
}
