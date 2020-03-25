<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

interface PieData {
  name: string;
  value: number;
  valueOf: () => number;
  index: number;
}

@Component
export default class PieChart extends Vue {
  private data: PieData[];
  private radius: number;
  private height: number;
  private width: number;
  private margin: number;

  constructor() {
    super();
    this.data = [{
      name: '<5',
      value: 5,
      valueOf: () => 5,
      index: 0,
    }, {
      name: '<10',
      value: 10,
      valueOf: () => 10,
      index: 1,
    }, {
      name: '<10xxx',
      value: 20,
      valueOf: () => 20,
      index: 1,
    }, {
      name: '<xxxx',
      value: 30,
      valueOf: () => 30,
      index: 1,
    }];
    this.height = 450;
    this.width = 450;
    this.margin = 40;
    this.radius = Math.min(this.width, this.height) / 2 - this.margin
  }

  mounted() {
    const svg = d3.create('svg')
      .attr('width', `${this.width}`)
      .attr('height', `${this.height}`)
      .attr("viewBox", `0 0 ${this.width} ${this.height}`);

    const g = svg.append('g').attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(this.data.map(data => data.name))
      .range([
        "#98abc5",
        "#8a89a6",
        "#7b6888",
        "#6b486b",
        "#a05d56"
      ])

    const pie = d3.pie()
      .padAngle(0.5)
      .sort(null)
      .value(data => data.valueOf());
    const arcs = pie(this.data);

    const arc = d3.arc().innerRadius(100).outerRadius(this.radius);
    g.selectAll("whatever")
      .data(arcs)
      .enter()
      .append('path')
        .attr('d', d => arc({
          innerRadius: 100,
          outerRadius: this.radius,
          startAngle: d.startAngle,
          endAngle: d.endAngle,
        }))
        .attr('fill', d => {
          console.log(d);
          const result =  color(`${d.value}`);
          return `${result}`;
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


    this.$el.append(svg.node() as Node);
  }
}
</script>
<template>
  <section class="pie-chart">
  </section>
</template>
