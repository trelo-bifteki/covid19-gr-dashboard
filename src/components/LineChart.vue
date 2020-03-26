<script lang="ts">
import {
  Component, Prop, Vue
} from 'vue-property-decorator';
import PieData from '@/types/PieData';
import * as d3 from 'd3';

interface RectMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const defaultMargin: RectMargin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 10,
};

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
    default: () => defaultMargin,
    type: Object,
  })
  private margin!: RectMargin;

  @Prop({
    default: () => [],
    type: Array,
  })
  private data!: PieData[];

  mounted() {
    const width = this.width + this.margin.left + this.margin.right;
    const height = this.height + this.margin.bottom + this.margin.top;
    const svg = d3.create('svg')
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.append('g')
      .attr(
        'transform',
        `translate(${this.margin.left}, ${this.margin.top})`
      );

    const xAxis = d3.scaleLinear()
      .domain([0, 100])
      .range([0, this.width])

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xAxis));


    const histogram = d3.histogram()
      .value(d => d.valueOf())
      .domain([0, 100])
      .thresholds(xAxis.ticks(1))

    const bins = histogram(this.data.map(datum => datum.value));

    const yAxis = d3.scaleLinear()
      .range([height, 0]);
    const maxLength: number = d3.max(bins, d => d.length) || 0;
    yAxis.domain([0, maxLength]);

    svg.append('g')
      .call(d3.axisLeft(yAxis))

    this.$el.append(svg.node() as Node);
  }
}
</script>

<template>
  <section class="line-chart">
  </section>
</template>
