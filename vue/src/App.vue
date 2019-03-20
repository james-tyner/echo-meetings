<template>
  <div id="app">
    <Navbar></Navbar>

    <header>
      <h1 class="page-title">{{pageName}}</h1>
    </header>

    <!-- middle area -->
    <main>
      <section>
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import data from './data'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data: function () {
    return {
      pageName: data['page']
    }
  },
  watch: {
    $route (to) {
      this.pageName = to.name
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.pageName = this.$route.name
    })
  }
}
</script>

<style lang="scss">
</style>
