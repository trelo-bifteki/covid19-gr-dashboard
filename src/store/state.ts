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
    long: 9.083,
    lat: 42.149
  }, // corsica
  {
    long: 7.26,
    lat: 43.71
  }, // nice
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
