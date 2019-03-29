<template>
  <div id="app">
    <Navbar v-bind:pageGroup="pageGroup"></Navbar>

    <Header v-bind:pageName="pageName"></Header>

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import data from './data'

export default {
  name: 'app',
  components: {
    Navbar,
    Header
  },
  data: function () {
    return {
      pageName: data['page'],
      pageGroup: data["group"]
    }
  },
  watch: {
    $route (to) {
      this.pageName = to.name
      this.pageGroup = to.group
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.pageName = this.$route.name
      this.pageGroup = this.$route.group
    })
  }
}
</script>

<style lang="scss">
  @import 'styles/styles';
</style>
