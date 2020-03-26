<script lang="ts">
import {
  Component, Vue
} from 'vue-property-decorator';
import * as d3 from 'd3';
import {
  GeoProjection, GeoPath
} from 'd3';

@Component
export default class RegionMap extends Vue {

  private data: [number, number][];
  line: string | null;

  constructor() {
    super();
    this.data = [[1, 2], [2, 3], [3, 4]];
    this.line = null;
  }

  created() {
    this.calculatePath();
  }

  createSvg() {
    return d3.create('svg');
  }

  get projection(): GeoProjection {
    return d3.geoEquirectangular()
      .center([0, 15])
  }

  get path(): GeoPath {
    return d3.geoPath().projection(this.projection);
  }

  getScales() {
    const x = d3.scaleTime().range([0, 430]);
    const y = d3.scaleLinear().range([210, 0]);
    return {
      x, y
    };
  }

  calculatePath() {
    const scale = this.getScales();
    const path = d3.line()
      .x((d: [number, number], i: number) => scale.x(i))
      .y((d: [number, number]) => scale.y(d[1]));
    this.line = path(this.data);
  }
}
</script>
<template>
  <section class="region-map">
    <h2>Region map</h2>
    path: {{ path }}
    <template>
      <svg width="500" height="270" viewBox="0 0 500 270">
        <g>
          <path :d="path" />
          <circle cx="50%" cy="50%" r="4" fill="black"/>
        </g>
      </svg>
    </template>

  </section>
</template>

<style lang="sass" scoped>
svg
  margin: 25px
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
