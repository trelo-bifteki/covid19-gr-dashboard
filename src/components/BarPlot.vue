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

  @Prop({
    default: () => [],
    type: Array,
  })
  private data!: PieData[];

  mounted() {
    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.bottom - this.margin.top;
    const svg = d3.create('svg')
      .attr('width', '100%')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);
    const maxValue = Math.max(...this.data.map(d => d.value));

    const g = svg.append('g')
      .attr(
        'transform',
        `translate(${this.margin.left}, ${this.margin.top})`
      );

    const xAxis = d3.scaleBand()
      .domain(this.data.map(d => d.name))
      .range([0, width])
      .padding(0.5);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xAxis))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    const yAxis = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height, 0]);


    g.append('g')
      .call(d3.axisLeft(yAxis))

    // A function that create / update the plot for a given variable:
    function update(data: PieData[]) {
      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => {
          const result = xAxis(d.name)
          return `${result}`;
        })
        .attr('y', d => { return yAxis(d.value); })
        .attr('width', xAxis.bandwidth())
        .attr('height', (d) => { return height - yAxis(d.value); })
        .attr('fill', '#69b3a2');
    }

    // Initialize the plot with the first dataset
    update(this.data)

    this.$el.append(svg.node() as Node);
  }
}
</script>

<template>
  <section class="line-chart">
  </section>
</template>
