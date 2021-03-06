<script lang="ts">
import RegionMap from '@/components/RegionMap.vue';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';
import BarPlot from '@/components/BarPlot.vue';
import TimelineChart from '@/components/TimelineChart.vue';

import {
  Marker
} from '@/store/types';

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
    TimelineChart,
  },
})
export default class Home extends Vue {

  isLoading = true;

  @Prop({
    default: null,
    type: String
  })
  private date!: string;

  private centerX = 24;
  private centerY = 38.5;

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
      const data = await import(
        `@/assets/covid19-gr-json/covid-19-gr-${this.currentDateOrLatestDate}.json`
      );
      this.$store.commit('setCurrentDailyData', data);
    } finally {
      this.isLoading = false;
    }
  }

  get latestDate(): string {
    return this.$store.getters.latestDate;
  }

  get markers(): Marker[] {
    return this.$store.state.markers;
  }

  get currentDateOrLatestDate(): string {
    return this.date === null ? this.latestDate : this.date;
  }

  get currentDailyData(): DailyCoronaData | null {
    return this.$store.state.currentDailyData;
  }

  get totalCases(): number {
    return this.currentDailyData?.total || 0;
  }

  get currentDeaths(): number {
    return this.currentDailyData?.current_deaths || 0;
  }

  get newConfirmed(): number {
    return this.currentDailyData?.new_confirmed || 0;
  }

  get casesGroupedByAge(): PieData[] {
    if (!this.currentDailyData) {
      return [];
    }

    return [{
      name: '65+',
      value: this.currentDailyData['65_plus'],
    }, {
      name: '40-64',
      value: this.currentDailyData['40-64'],
    }, {
      name: '18-39',
      value: this.currentDailyData['18-39'],
    }, {
      name: '0-17',
      value: this.currentDailyData['0-17'],
    }].reverse();
  }

  get casesGroupedByGender(): PieData[] {
    if (!this.currentDailyData) {
      return [];
    }
    return [{
      name: 'men',
      value: this.currentDailyData['men'],
    }, {
      name: 'women',
      value: +this.currentDailyData['women'],
    }];
  }

  get casesGroupedByHospitilization(): PieData[] {
    if (!this.currentDailyData) {
      return [];
    }

    return [{
      name: 'in_IC',
      value: this.currentDailyData['in_IC'],
    }, {
      name: 'currently_treating',
      value: this.currentDailyData['currently_treating']
    }, {
      name: 'recovered',
      value: this.currentDailyData['recovered'],
    }];
  }

  get topTenTotalCasesGroupedByRegion(): PieData[] {
    if (!this.currentDailyData) {
      return [];
    }

    const results: PieData[] = [];

    for (const region in this.currentDailyData.regions) {
      results.push({
        name: region,
        value: this.currentDailyData.regions[region],
      });
    }

    results.sort((one, another) => another.value - one.value);

    return results.slice(0, 10);
  }
}
</script>

<template>
  <section
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

    <div class="home-view__primary-row">
      <div class="home-view__overview">
        <RegionMap
          :center-x="centerX"
          :center-y="centerY"
          :markers="markers"
        />

        <TimelineChart
          :data="topTenTotalCasesGroupedByRegion"
        />

        <BarPlot
          :data="topTenTotalCasesGroupedByRegion"
        />
      </div>

      <div class="home-view__sidebar">
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
    </div>
  </section>
</template>

<style lang="sass">
@import '../scss/breakpoints'
@import '../scss/variables'

.home-view
  &__overview
    flex: 2 1 0
    margin-bottom: $space
    @include larger-than-breakpoint-small
      padding-right: 2 * $space
      margin-bottom: 0
  &__pie-chart
    border: 1px solid #DCDCDC
    border-radius: 2px
    flex: 1 1 0px
    margin-bottom: $space
    padding: $space
    &:last-child
      margin-right: 0
  &__pie-charts
    display: flex
    flex-direction: column
    @include larger-than-breakpoint-small
      flex-direction: row
  &__primary-row
    display: flex
    flex-direction: column
    margin-bottom: $space
    @include larger-than-breakpoint-small
      flex-direction: row
  &__card
    background-color: $color-rainbow-green
    border: 1px solid green
    border-radius: 2px
    flex: 1 1 0px
    margin-bottom: $space
    padding: $space
    @include larger-than-breakpoint-small
      flex-direction: row
      margin-bottom: 0
      margin-right: $space
    &:last-child
      margin-bottom: 0
      @include larger-than-breakpoint-small
        margin-right: 0
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
  &__sidebar
    display: flex
    flex: 1 1 0
    flex-direction: column
</style>
