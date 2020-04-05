<script lang="ts">
import {
  Component, Prop, Watch, Vue
} from 'vue-property-decorator';
import * as d3 from 'd3';
import {
  GeoProjection, GeoPath
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

  private data: [number, number][];
  line: string | null;
  private gElement!: d3.Selection<SVGGElement, undefined, null, undefined>;

  @Watch('centerX')
  onCenterXChange(): void {
    this.draw();
  }

  @Watch('centerY')
  onCenterYChange(): void {
    this.draw();
  }

  @Watch('markers')
  onMarkersChange(): void {
    this.draw();
  }

  constructor() {
    super();
    this.data = [[1, 2], [2, 3], [3, 4]];
    this.line = null;
  }

  get viewbox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  get greeceGeoJson(): any {
    return greece10mgeojson;
  }

  get geoPath(): any {
    return d3.geoPath().projection(this.projection);
  }

  get superpath(): string {
    const path = d3.geoPath().projection(this.projection);
    console.log(this.greeceGeoJson[0])
    const result = path(this.greeceGeoJson[0]);
    console.log(result);
    return `${result}`;
  }

  private draw(): void {
    this.gElement.selectAll('path').remove();
    this.gElement.selectAll('circle').remove();

    this.gElement.selectAll('path')
      .data(this.greeceGeoJson)
      .enter()
      .append('path')
      .attr('fill', 'grey')
      .attr('d', this.geoPath)
      .style('stroke', 'black')
      .style('opacity', .3);

    // Add circles:
    this.gElement
      .selectAll('circles')
      .data(this.markers)
      .enter()
      .append('circle')
      .attr('cx', d => {
        console.log(d);
        const projection = this.projection([d.long, d.lat])
        return projection ? projection[0] : null
      })
      .attr('cy', d => {
        const projection = this.projection([d.long, d.lat])
        return projection ? projection[1] : null
      })
      .attr('r', 14)
      .style('fill', '#69b3a2')
      .attr('stroke', '#69b3a2')
      .attr('stroke-width', 3)
      .attr('fill-opacity', .4)
  }

  private calculateCX(marker: Marker): number | null{
    const projection = this.projection([
      marker.long,
      marker.lat
    ]);

    return projection ? projection[0] : null;
  }

  private calculateCY(marker: Marker): number | null{
    const projection = this.projection([
      marker.long,
      marker.lat
    ]);

    return projection ? projection[1] : null;
  }

  get circleItems(): any[] {
    let counter = 0;
    console.log(this.markers);
    return this.markers.map(marker => ({
      id: counter++,
      cx: this.calculateCX(marker),
      cy: this.calculateCY(marker),
    }));
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
  <svg
    class="region-map"
    width="100%"
    :viewbox="viewbox"
  >
    <g>
      <path
        :d="superpath"
        fill="grey"
        stroke="black"
        opacity="0.3"
      />
    </g>
    <circle
      v-for="item in circleItems"
      :key="item.name"
      :cx="item.cx"
      :cy="item.cy"
      r="14"
      stroke="black"
      stroke-width="3"
      fill="#69b3a2"
      fill-opacity="0.4"
    />

  </svg>
</template>

<style lang="sass">
</style>
