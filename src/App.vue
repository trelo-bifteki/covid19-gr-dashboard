<script lang="ts">
import {
  Component, Vue
} from 'vue-property-decorator';
import {
  mapGetters, mapActions
} from 'vuex';

mapGetters
@Component({
  computed: {
    ...mapGetters([
      'availableDates',
    ]),
  },
})
export default class App extends Vue{
  created() {
    this.$store.dispatch('findAll');
  }
}
</script>
<template>
  <div class="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link> |
      <template v-for="date in availableDates">
        <router-link
          :key="date"
          class="app__link"
          :to="`/status/${date}`"
        >
          {{ date }}
        </router-link> |
      </template>

      <router-link to="/about">
        About
      </router-link>
    </div>
    <div class="app__main">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import 'reset-css';
@import 'scss/variables';
@import 'scss/fluid';

*,
*:before,
*:after {
  box-sizing: border-box;
}

.app {
  background-color: $color-white;
  color: $color-gray-darkest;
  font-family: $font-family-base;
  font-size: 100%;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  &__main {
     @include body-container;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
