<script lang="ts">
import RegionMap from '@/components/RegionMap.vue';
import PieChart from '@/components/PieChart.vue';
import { Component, Vue } from 'vue-property-decorator';
import todayData from '@/assets/data/covid-19-gr-2020-03-24.json';
import PieData from '../types/PieData';

@Component({
  name: 'Home',
  components: {
    RegionMap,
    PieChart,
  },
})
export default class Home extends Vue {
  data: any; // eslint-disable-line

  constructor() {
    super();
    this.data = todayData;
  }

  get totalCases(): number {
    return todayData.total;
  }

  get casesGroupedByAge(): PieData[] {
    return [{
      name: '65+',
      value: +todayData['65_plus'],
    }, {
      name: '40-64',
      value: +todayData['40-64'],
    }, {
      name: '18-39',
      value: +todayData['18-39'],
    }, {
      name: '0-17',
      value: +todayData['0-17'],
    }].reverse();
  }
}
</script>

<template>
  <article class="home-view">
    <section class="home-view__card">
      <h2>Σύνολo</h2>
       {{ totalCases }}
    </section>
   <PieChart :data="casesGroupedByAge" />
  </article>
</template>

<style lang="sass">
.home-view
  &__card
    border: 1px solid green
    border-radius: 2px
</style>
