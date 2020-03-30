import {
  Commit
} from 'vuex';
import {
  ActionTree
} from 'vuex';
import {
  RootState
} from './types';
import DailyCoronaData from '@/types/DailyCoronaData';

const actions: ActionTree<RootState, any> = {
  findAll({
    commit
  }: { commit: Commit }) {
    const results: Record<string, DailyCoronaData> = {
    };
    const importAll = (context: any) => context.keys().forEach((key: string) => {
      results[key] = context(key);
    });
    importAll(require.context('@/assets/covid19-gr-json/', false, /.json$/));
    commit('setData', results);
  }
}

export default actions;
