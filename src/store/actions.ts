import {
  Commit
} from 'vuex';

export default {
  findAll({
    commit
  }: { commit: Commit }) {
    const results: Record<string, any> = {
    };
    const importAll = (context: any) => context.keys().forEach((key: string) => {
      results[key] = context(key);
    });
    importAll(require.context('@/assets/covid19-gr-json/', false, /.json$/));
  }
}
