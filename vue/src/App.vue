<template>
  <div id="app">
    <Navbar></Navbar>

    <header>
      <h1 class="page-title">Dashboard</h1>
    </header>

    <!-- middle area -->
    <main>
      <section>
        <Dashboard></Dashboard>
      </section>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Dashboard from './views/dashboard'

export default {
  name: 'app',
  components: {
    Navbar,
    Dashboard
  },
  data: function () {
    return {
      items: [{
        id: 1,
        msg: 'Name 1'
      }, {
        id: 2,
        msg: 'Name 2'
      }]
    }
  }
}
</script>

<style lang="scss">
</style>
