<script lang="ts">
import {
  Component, Prop, Watch, Vue
} from 'vue-property-decorator';
import * as d3 from 'd3';
import {
  GeoProjection, GeoPath
} from 'd3';

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

  private data: [number, number][];
  line: string | null;
  private gElement!: d3.Selection<SVGGElement, undefined, null, undefined>;

  @Watch('centerX')
  onCenterXChange(): void {
    this.draw();
    console.log('x');
  }

  @Watch('centerY')
  onCenterYChange(): void {
    this.draw();
    console.log('y');
  }

  constructor() {
    super();
    this.data = [[1, 2], [2, 3], [3, 4]];
    this.line = null;
  }

  mounted() {
    const svg = d3.create('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.gElement = svg.append('g');

    this.draw();

    this.$el.append(svg.node() as Node);
  }

  get greeceGeoJson(): any {
    return greece10mgeojson;
  }

  get geoPath(): any {
    return d3.geoPath().projection(this.projection);
  }

  private draw(): void {
    console.log('draw');
    this.gElement.selectAll('path').remove();
    this.gElement.selectAll('path')
      .data(this.greeceGeoJson)
      .enter()
      .append('path')
      .attr('fill', 'grey')
      .attr('d', this.geoPath)
      .style('stroke', 'black')
      .style('opacity', .3);
  }

  get projection(): GeoProjection {
    return d3.geoMercator()
      .center([this.centerX, this.centerY])
      .scale(2500)
      .translate([
        this.width / 2,
        this.height / 2,
      ])
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

  get anotherPath() {
    const scale = this.getScales();
    const path = d3.line()
      .x((d: [number, number], i: number) => scale.x(i))
      .y((d: [number, number]) => scale.y(d[1]));

    return path(this.data);
  }
}
</script>
<template>
  <section class="region-map" />
</template>

<style lang="sass" scoped>
svg
  margin: 25px
path
  fill: none
  stroke: #76BF8A
  stroke-width: 3px
</style>
