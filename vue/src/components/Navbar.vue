<template>
  <nav id="sidebar">
    <img id="logo" src="assets/logo_dark.svg" alt="logo-img">
    <div class="nav-items">
      <router-link class="nav-item" to="/">Dashboard</router-link>
      <router-link class="nav-item" to="/meetings">Meetings</router-link>
      <router-link class="nav-item" to="/tasks">Tasks</router-link>
      <router-link class="nav-item" to="/">Teams</router-link>
    </div>
    <!-- test -->
    <!-- bottom part -->
    <div class="profile">
      <!-- User Photo -->
      <div id="profile-photo"></div>
      <div id="profile-info">
        <!-- User Name -->
        <a href="#"></a>
        <!-- Sign Out -->
        <a id="signout" href="#">Sign Out</a>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'Navbar',
  props: {
    items: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
