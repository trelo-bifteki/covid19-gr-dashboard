import {
  GetterTree
} from 'vuex';
import {
  RootState
} from './types';

const suffix = '.json';
const prefix = './covid-19-gr-';

const getters: GetterTree<RootState, any> = {
  files(state: RootState): string[] {
    const results: string[] = [];
    for (const file in state.data) {
      results.push(file);
    }
    return results;
  },

  availableDates(state: RootState, getters: any): string[] {
    return getters.files.map((file: string) => {
      const end = file.indexOf(suffix);
      return file.substring(prefix.length, end);
    }).filter((date: string) => date.startsWith('2020'));
  },

  latestDate(state: RootState, getters): string | null {
    const total = getters.availableDates.length;
    return total > 0
      ? getters.availableDates[total -1]
      : null;
  }
};

export default getters;
