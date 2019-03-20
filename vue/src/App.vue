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

export default {
  name: 'app',
  components: {
    Navbar
  },
  data: function () {
    return {
      pageName: 'Dashboard'
    }
  }
}
</script>

<style lang="scss">
</style>
