<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import PieData from '@/types/PieData';
import * as d3 from 'd3';

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

  private gElement!: d3.Selection<SVGGElement, undefined, null, undefined>;

  @Watch('data')
  private onDataChange() {
    this.reset();
    this.update();
  }

  constructor() {
    super();
  }

  get radius(): number {
    return Math.min(this.width, this.height) / 2 - this.margin;
  }

  get arcs(): d3.PieArcDatum<number | { valueOf(): number }>[] {
    const pie = d3.pie()
      .padAngle(0.5)
      .sort(null)
      .value(data => data.valueOf());
    const result = pie(this.data.map(data => data.value));
    return result;
  }

  mounted() {
    const svg = d3.create('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`);

    this.gElement = svg.append('g')
      .attr(
        'transform',
        `translate(${this.width / 2}, ${this.height / 2})`
      );

    this.update();

    this.$el.append(svg.node() as Node);
  }

  reset(): void {
    this.gElement.selectAll('path').remove();
    this.gElement.selectAll('text').remove();
  }

  update(): void {
    const color = d3.scaleOrdinal()
      .domain(this.data.map(data => data.name))
      .range(d3.schemeDark2)

    const arc = d3.arc().innerRadius(100).outerRadius(this.radius);
    this.gElement.selectAll('whatever')
      .data(this.arcs)
      .enter()
      .append('path')
      .attr('d', d => arc({
        innerRadius: this.margin,
        outerRadius: this.radius,
        startAngle: d.startAngle,
        endAngle: d.endAngle,
      }))
      .attr('fill', d => {
        const result =  color(`${d.value}`);
        return `${result}`;
      })
      .attr('stroke', 'white')
      .attr('stroke-width', '2px')
      .attr('opacity', 0.7);

    this.gElement.selectAll('whatever')
      .data(this.arcs)
      .enter()
      .append('text')
      .text(d => {
        const name = this.data[d.index].name;
        return `${name}: ${d.value}`
      })
      .attr('transform', d => {
        const result = arc.centroid({
          innerRadius: this.margin,
          outerRadius: this.radius,
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        });
        return `translate(${result})`;
      })
      .style('text-anchor', 'middle')
      .style('font-size', '1rem');
  }
}
</script>
<template>
  <section class="pie-chart" />
</template>
