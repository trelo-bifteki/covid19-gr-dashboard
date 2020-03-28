<script lang="ts">
import {
  Component, Prop, Vue, Watch,
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
  top: 30,
  right: 30,
  bottom: 60,
  left: 70,
};

@Component
export default class BarPlot extends Vue {

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

  @Watch('data')
  private onDataChange() {
    this.reset();
    this.update();
  }

  private gElement!: d3.Selection<SVGGElement, undefined, null, undefined>;

  @Prop({
    default: () => [],
    type: Array,
  })
  private data!: PieData[];

  mounted() {
    const svg = d3.create('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.gElement = svg.append('g')
      .attr(
        'transform',
        `translate(${this.margin.left}, ${this.margin.top})`
      );

    // Initialize the plot with the first dataset
    this.update();

    this.$el.append(svg.node() as Node);
  }

  get maxValue(): number {
    return Math.max(...this.data.map(d => d.value))
  }

  get innerHeight(): number {
    return this.height - this.margin.bottom - this.margin.top;
  }

  get innerWidth(): number {
    return this.width - this.margin.left - this.margin.right;
  }

  get xAxis(): d3.ScaleBand<string> {
    return d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([0, this.innerWidth])
      .padding(0.5);
  }

  get yAxis() {
    return d3.scaleLinear()
      .domain([0, this.maxValue])
      .range([this.innerHeight, 0]);
  }

  reset() {
    this.gElement.selectAll('g').remove();
    this.gElement.selectAll('rect').remove();
  }

  // A function that create / update the plot for a given variable:
  update(): void {
    this.gElement.append('g')
      .attr('transform', `translate(0,${this.innerHeight})`)
      .call(d3.axisBottom(this.xAxis))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    this.gElement.append('g')
      .call(d3.axisLeft(this.yAxis))

    this.gElement.selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', d => {
        const result = this.xAxis(d.name)
        return `${result}`;
      })
      .attr('y', d => this.yAxis(d.value))
      .attr('width', this.xAxis.bandwidth())
      .attr('height', d => this.innerHeight - this.yAxis(d.value))
      .attr('fill', '#69b3a2');
  }
}
</script>

<template>
  <section class="line-chart">
  </section>
</template>
