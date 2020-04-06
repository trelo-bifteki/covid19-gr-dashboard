/* eslint @typescript-eslint/camelcase: 0 */
import cities from '@/assets/cities.json';
import {
  RootState
} from './types';

const state: RootState = {
  data: {
  },
  currentDailyData: {
    '0-17': 0,
    '18-39': 0,
    '40-64': 0,
    '65_plus': 0,
    current_deaths: 0,
    currently_treating: 0,
    in_IC: 0,
    men: 0,
    new_confirmed: 0,
    recovered: 0,
    regions: {
    },
    total: 0,
    women: 0,
  },
  isLoading: false,
  markers: cities,
};

export default state;
