import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentDailyData: {
    },
  },
  mutations: {
    setCurrentData(state, currentData) {
      state.currentDailyData = {
        ...currentData
      };
    }
  },
  actions: {
  },
  modules: {
  },
});
