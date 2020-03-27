<script lang="ts">
import RegionMap from '@/components/RegionMap.vue';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';
import BarPlot from '@/components/BarPlot.vue';

import {
  Component, Prop, Vue, Watch
} from 'vue-property-decorator';
import PieData from '@/types/PieData';
import DailyCoronaData from '@/types/DailyCoronaData';
import {
  Route
} from 'vue-router';

@Component({
  name: 'Home',
  components: {
    BarPlot,
    LineChart,
    PieChart,
    RegionMap,
  },
})
export default class Home extends Vue {
  data?: DailyCoronaData; // eslint-disable-line
  isLoading = true;

  @Prop({
    default: '2020-03-24',
    type: String
  })
  private date!: string;

  @Watch('$route')
  private onRouteChange(current: Route, previous: Route) {
    const currentDate = current.params.date;
    const previousDate = previous.params.date;

    if (currentDate !== previousDate) {
      this.loadData();
    }
  }

  constructor() {
    super();
  }

  async created() {
    this.loadData();
  }

  async loadData() {
    try {
      this.isLoading = true;
      this.data = await import(
        `@/assets/data/covid-19-gr-${this.date}.json`
      );
      console.log(this.data);
    } finally {
      this.isLoading = false;
    }
  }

  get totalCases(): number {
    return this.data?.total || 0;
  }

  get currentDeaths(): number {
    return this.data?.current_deaths || 0;
  }

  get newConfirmed(): number {
    return this.data?.new_confirmed || 0;
  }

  get casesGroupedByAge(): PieData[] {
    if (!this.data) {
      return [];
    }

    return [{
      name: '65+',
      value: this.data['65_plus'],
    }, {
      name: '40-64',
      value: this.data['40-64'],
    }, {
      name: '18-39',
      value: this.data['18-39'],
    }, {
      name: '0-17',
      value: this.data['0-17'],
    }].reverse();
  }

  get casesGroupedByGender(): PieData[] {
    if (!this.data) {
      return [];
    }
    return [{
      name: 'men',
      value: this.data['men'],
    }, {
      name: 'women',
      value: +this.data['women'],
    }];
  }

  get casesGroupedByHospitilization(): PieData[] {
    if (!this.data) {
      return [];
    }

    return [{
      name: 'in_IC',
      value: this.data['in_IC'],
    }, {
      name: 'currently_treating',
      value: this.data['currently_treating']
    }, {
      name: 'recovered',
      value: this.data['recovered'],
    }];
  }

  get topTenTotalCasesGroupedByRegion(): PieData[] {
    if (!this.data) {
      return [];
    }

    const results: PieData[] = [];
    console.log(this.data.regions);
    for (const region in this.data.regions) {
      results.push({
        name: region,
        value: this.data.regions[region],
      });
    }

    results.sort((one, another) => another.value - one.value);

    return results.slice(0, 10);
  }
}
</script>

<template>
  <section
    v-if="!isLoading"
    class="home-view"
  >
    <div class="home-view__primary-row">
      <article class="home-view__card">
        <h2 class="home-view__card-title">
          Total
        </h2>

        <div class="home-view__total">
          {{ totalCases }}
        </div>
      </article>

      <article class="home-view__card home-view__card--dark">
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
    <div class="home-view__overview">
      <BarPlot
        :data="topTenTotalCasesGroupedByRegion"
      />
    </div>
  </section>
</template>

<style lang="sass">
@import '../scss/breakpoints'
@import '../scss/variables'

.home-view
  &__overview
    border: 1px solid #DCDCDC
    margin: $space
    max-width: 66%
    padding: $space
  &__pie-chart
    border: 1px solid #DCDCDC
    border-radius: 2px
    flex: 1 1 0px
    margin: $space
    padding: $space
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
    flex: 1 1 0px
    margin: $space
    padding: $space
    &--dark
      background-color: $color-gray-darkest
      color: white
  &__card-title
    font-size: 1.5rem
    font-weight: bold
  &__card-value
    color: white
    font-size: 3rem
    &--warn
      color: $color-rainbow-orange
  &__total
    color: white
    font-size: 3rem
</style>
