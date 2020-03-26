<script lang="ts">
import RegionMap from '@/components/RegionMap.vue';
import PieChart from '@/components/PieChart.vue';
import { Component, Vue } from 'vue-property-decorator';
import todayData from '@/assets/data/covid-19-gr-2020-03-24.json';
import PieData from '@/types/PieData';
import DailyCoronaData from '@/types/DailyCoronaData';

@Component({
  name: 'Home',
  components: {
    RegionMap,
    PieChart,
  },
})
export default class Home extends Vue {
  data: DailyCoronaData; // eslint-disable-line

  constructor() {
    super();
    this.data = todayData;
  }

  get totalCases(): number {
    return todayData.total;
  }

  get currentDeaths(): number {
    return todayData.current_deaths;
  }

  get newConfirmed(): number {
    return todayData.new_confirmed;
  }

  get casesGroupedByAge(): PieData[] {
    return [{
      name: '65+',
      value: todayData['65_plus'],
    }, {
      name: '40-64',
      value: todayData['40-64'],
    }, {
      name: '18-39',
      value: todayData['18-39'],
    }, {
      name: '0-17',
      value: todayData['0-17'],
    }].reverse();
  }

  get casesGroupedByGender(): PieData[] {
    return [{
      name: 'men',
      value: +todayData['men'],
    }, {
      name: 'women',
      value: +todayData['women'],
    }];
  }

  get casesGroupedByHospitilization(): PieData[] {
    return [{
      name: 'in_IC',
      value: +todayData['in_IC'],
    }, {
      name: 'currently_treating',
      value: +todayData['currently_treating']
    }, {
      name: 'recovered',
      value: +todayData['recovered'],
    }];
  }
}
</script>

<template>
  <section class="home-view">
    <div class="home-view__primary-row">
      <article class="home-view__card">
        <h2 class="home-view__card-title">
          Total
        </h2>

        <div class="home-view__total">
          {{ totalCases }}
        </div>
      </article>

      <article class="home-view__card">
        <h2 class="home-view__card-title">
          Current deaths
        </h2>
        <div class="home-view__card-value home-view__card-value--warn">
          {{ currentDeaths }}
        </div>
      </article>

      <article class="home-view__card">
        <h2 class="home-view__card-title">
          New confirmed
        </h2>
        <div class="home-view__total">
          {{ newConfirmed }}
        </div>
      </article>
    </div>

    <div class="home-view__pie-charts">
       <PieChart
        class="home-view__pie-chart"
        :data="casesGroupedByAge"
      />

      <PieChart
        class="home-view__pie-chart"
        :data="casesGroupedByGender"
      />

      <PieChart
        class="home-view__pie-chart"
        :data="casesGroupedByHospitilization"
      />
    </div>
  </section>
</template>

<style lang="sass">
@import '../scss/breakpoints'
@import '../scss/variables'

.home-view
  &__pie-charts
    display: flex
    flex-direction: column
    @include larger-than-breakpoint-small
      flex-direction: row
  &__primary-row
    display: flex
    flex-direction: column
    @include larger-than-breakpoint-small
      flex-direction: row
  &__card
    background-color: $color-rainbow-green
    border: 1px solid green
    border-radius: 2px
    flex-grow: 1
    margin: $space
    padding: $space
  &__card-title
    font-size: 1.5rem
    font-weight: bold
  &__card-value
    color: white
    font-size: 3rem
    &--warn
      color: $color-rainbow-red
  &__total
    color: white
    font-size: 3rem
</style>
