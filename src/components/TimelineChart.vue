<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import PieData from '@/types/PieData';
import * as d3 from 'd3';

@Component
export default class TimelineChart extends Vue {
  @Prop({
    default: () => [],
    type: Array,
  })
  private data!: PieData[];

  @Prop({
    default: 450,
    type: Number,
  })
  private height!: number;

  @Prop({
    default: 50,
    type: Number,
  })
  private marginX!: number;


  @Prop({
    default: 50,
    type: Number,
  })
  private marginY!: number;


  @Prop({
    default: 950,
    type: Number,
  })
  private width!: number;

  private get maxValue(): number {
    return Math.max(...this.data.map(d => d.value))
  }

  get yAxisLine(): string {
    const yScaleLiner = d3.scaleLinear()
      .range([
        this.height,
        0
      ]).domain([
        0,
        this.maxValue,
      ]);
    const axisRight = d3.axisRight(yScaleLiner);

    return `${d3.axisRight(yScaleLiner)}`;
  }

  get tranformStage(): string {
    return `translate(${this.marginX}, ${this.marginY})`;
  }

  get viewBox(): string {
    const outerWidth = this.width + this.marginX;
    const outerHeight = this.height + this.marginY;
    return `0 0 ${outerWidth} ${outerHeight}`;
  }
}
</script>

<template>
  <svg
    class="timeline-chart"
    :viewBox="viewBox"
  >
    <g
      class="timeline-chart__stage"
      :tranform="tranformStage"
    >
      <g class="timeline-chart__y-axis-container">
        <path
          class="timeline-chart__y-axis"
          :d="yAxisLine"
        />
      </g>
    </g>
  </svg>
</template>
