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
    console.log(results);
    return results;
  },

  availableDates(state: RootState, getters: any): string[] {
    return getters.files.map((file: string) => {
      const end = file.indexOf(suffix);
      return file.substring(prefix.length, end);
    });
  }
};

export default getters;
