<template>
  <div class="home">
   <PieChart />
  </div>
</template>

<script>
import RegionMap from '@/components/RegionMap.vue';
import PieChart from '@/components/PieChart.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Home',
  components: {
    RegionMap,
    PieChart,
  },
})
export default class Home extends Vue {
}
</script>
