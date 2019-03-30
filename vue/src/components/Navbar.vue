<template>
  <nav id="sidebar">
    <img id="logo" src="assets/logo_dark.svg" alt="logo-img">
    <div class="nav-items">
      <router-link class="nav-item" v-bind:class="{active : currentDashboard}" to="/">Dashboard</router-link>
      <router-link class="nav-item" v-bind:class="{active : currentMeetings}" to="/meetings">Meetings</router-link>
      <router-link class="nav-item" to="/tasks">Tasks</router-link>
      <router-link class="nav-item" to="/teams">Teams</router-link>
    </div>
    <!-- test -->
    <!-- bottom part -->
    <div class="profile">
      <!-- User Photo -->
      <div id="profile-photo"></div>
      <div id="profile-info">
        <!-- User Name -->
        <a href="#">{{firstName}}</a>
        <!-- Sign Out -->
        <a id="signout" href="#">Sign Out</a>
      </div>
    </div>
  </nav>

</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    currentDashboard:function(){
      if (this.pageGroup == "dashboard"){
        return true
      }
    },
    currentMeetings:function(){
      if (this.pageGroup == "meetings"){
        return true
      }
    },
    currentTasks:function(){
      if (this.pageGroup == "tasks"){
        return true
      }
    },
    currentTeams:function(){
      if (this.pageGroup == "teams"){
        return true
      }
    }
  },
  props: {
    items: Object,
    firstName: {
      type:String,
      default:"James"
    },
    pageGroup: {
      type:String,
      default:"dashboard"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
