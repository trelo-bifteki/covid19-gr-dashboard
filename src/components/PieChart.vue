<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import PieData from '@/types/PieData';
import * as d3 from 'd3';
import {
  ScaleOrdinal
} from 'd3';

@Component
export default class PieChart extends Vue {
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
    default: () => [],
    type: Array,
  })
  private data!: PieData[];

  @Prop({
    default: 40,
    type: Number,
  })
  private margin!: number;

  get radius(): number {
    return Math.min(this.width, this.height) / 2 - this.margin;
  }

  get arcs(): d3.PieArcDatum<number | { valueOf(): number }>[] {
    const pie = d3.pie()
      .padAngle(0.5)
      .sort(null)
      .value(data => data.valueOf());
    return pie(this.data.map(data => data?.value || 0));
  }

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  get transform(): string {
    return `translate(${this.width / 2}, ${this.height / 2})`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get arc(): d3.Arc<any, d3.DefaultArcObject> {
    return d3.arc().innerRadius(100).outerRadius(this.radius);
  }

  get color(): ScaleOrdinal<string, unknown> {
    return d3.scaleOrdinal()
      .domain(this.data.map(data => data.name))
      .range(d3.schemeDark2);
  }

  private calculatePath(source: d3.PieArcDatum<number | { valueOf(): number }>): string | null {
    return this.arc({
      innerRadius: this.margin,
      outerRadius: this.radius,
      startAngle: source.startAngle,
      endAngle: source.endAngle,
    });
  }

  private calculateTranslate(source: d3.PieArcDatum<number | { valueOf(): number }>): string | null {
    const value = this.arc.centroid({
      innerRadius: this.margin,
      outerRadius: this.radius,
      startAngle: source.startAngle,
      endAngle: source.endAngle,
    });

    return `translate(${value})`
  }

  private calculateLabel(source: d3.PieArcDatum<number|{ valueOf(): number }>): string {
    const item = this.data[source.index];
    if (!item) {
      return '';
    }
    return `${item.name}: ${source.value}`;
  }

  get pathItems(): { d: string | null }[] {
    let counter = 0;
    return this.arcs.map(arc => ({
      id: counter++,
      d: this.calculatePath(arc),
      fill: '' + this.color(`${arc.value}`),
      label: this.calculateLabel(arc),
      transform: this.calculateTranslate(arc),
    }));
  }
}
</script>
<template>
  <svg
    :viewBox="viewBox"
    aria-labelledby="pie-chart"
  >
    <g :transform="transform">
      <g
        v-for="item in pathItems"
        :key="item.id"
      >
        <path
          class="pie-chart__piece"
          :d="item.d"
          :fill="item.fill"
        />
        <text
          class="pie-chart__text"
          :transform="item.transform"
        >
          {{ item.label }}
        </text>
      </g>
    </g>
  </svg>
</template>

<style lang="sass">
.pie-chart
  &__piece
    stroke: white
    stroke-width: 2
    opacity: .7
  &__text
    font-size: 1rem
    text-anchor: middle
</style>
