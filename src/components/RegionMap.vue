<script lang="ts">
import {
  Component, Prop, Vue
} from 'vue-property-decorator';
import * as d3 from 'd3';
import {
  GeoProjection
} from 'd3';
import {
  Marker
} from '@/store/types';

import greece10mgeojson from '@/assets/greece-10m.geo.json';

@Component
export default class RegionMap extends Vue {
  @Prop({
    default: 450,
    type: Number,
  })
  private height!: number;

  @Prop({
    default: 450,
    type: Number,
  })
  private width!: number;

  @Prop({
    default: 22,
    type: Number,
  })
  private centerX!: number;

  @Prop({
    default: 22,
    type: Number,
  })
  private centerY!: number;

  @Prop({
    default: () => [],
    type: Array,
  })
  markers!: Marker[];

  get viewbox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  get projection(): GeoProjection {
    return d3.geoMercator()
      .center([this.centerX, this.centerY])
      .scale(2500)
      .translate([
        this.width / 2,
        this.height / 2,
      ]);
  }

  get countryPath(): string {
    const countryData = greece10mgeojson[0];
    const path = d3.geoPath().projection(this.projection);
    const result = path(countryData as any);
    return `${result}`;
  }

  get circleItems(): any[] {
    let counter = 0;
    return this.markers.map(marker => {
      const projection = this.projection([
        marker.long,
        marker.lat
      ]) ||  [0, 0];
      return {
        id: counter++,
        cx: projection[0],
        cy: projection[1],
      };
    });
  }
}
</script>

<template>
  <svg
    class="region-map"
    width="100%"
    preserveAspectRatio="xMinYMin meet"
    :viewBox="viewbox"
  >
    <g>
      <path
        :d="countryPath"
        fill="grey"
        stroke="black"
        opacity="0.3"
      />
    </g>
    <circle
      v-for="item in circleItems"
      :key="item.name"
      class="region-map__circle"
      :cx="item.cx"
      :cy="item.cy"
      r="6"
    />

  </svg>
</template>

<style lang="sass">
.region-map
  &__circle
    fill: #69b3a2
    fill-opacity: .4
    stroke: black
    stroke-width: 1
</style>
