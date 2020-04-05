import DailyCoronaData from '@/types/DailyCoronaData';

export interface Marker {
  long: number;
  lat: number;
  name?: string;
}

export interface RootState {
  data: Record<string, DailyCoronaData>;
  currentDailyData: DailyCoronaData;
  isLoading: boolean;
  markers: Marker[];
}
