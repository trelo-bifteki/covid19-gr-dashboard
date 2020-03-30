import {
  MutationTree
} from 'vuex';
import {
  RootState
} from './types';
import DailyCoronaData from '@/types/DailyCoronaData';

const mutations: MutationTree<RootState> = {
  setCurrentDailyData(state: RootState, currentDailyData: DailyCoronaData) {
    state.currentDailyData = {
      ...currentDailyData
    };
  },

  setData(state: RootState, data: Record<string, DailyCoronaData>) {
    state.data = {
      ...data
    };
  }
}

export default mutations;
