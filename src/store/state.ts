/* eslint @typescript-eslint/camelcase: 0 */
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
  markers: [{
    name: 'Athens', // Athens
    long: 23.727539,
    lat: 37.983810,
  }, {
    name: 'Thessaloniki',
    long: 22.920227,
    lat: 40.736851,
  },
  {
    name: 'Piraeus',
    long: 23.63708,
    lat: 37.94745,
  },
  {
    long: 2.349,
    lat: 48.864
  }, // Paris
  {
    long: -1.397,
    lat: 43.664
  }, // Hossegor
  {
    long: 3.075,
    lat: 50.640
  }, // Lille
  {
    long: -3.83,
    lat: 58
  }, // Morlaix
  ],
};

export default state;
