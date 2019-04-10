<template>
  <nav id="sidebar">
    <img id="logo" src="assets/logo_white.svg" alt="logo-img">
    <div class="nav-items">
      <router-link class="nav-item" v-bind:class="{active : currentDashboard}" to="/">Dashboard</router-link>
      <router-link class="nav-item" v-bind:class="{active : currentMeetings}" to="/meetings">Meetings</router-link>
      <router-link class="nav-item" v-bind:class="{active : currentTasks}" to="/tasks">Tasks</router-link>
      <router-link class="nav-item" v-bind:class="{active : currentTeams}" to="/teams">Teams</router-link>
    </div>
    <!-- test -->
    <!-- bottom part -->
    <div class="profile">
      <!-- User Photo -->
      <div id="profile-photo" :style="{ 'background-image': 'url(' + this.user_data.avatar + ')' }"></div>
      <div id="profile-info">
        <!-- User Name -->
        <a href="#">{{this.firstName}}</a>
        <!-- Sign Out -->
        <a id="signout" v-on:click="logout()">Sign Out</a>
      </div>
    </div>
  </nav>

</template>

<script>
import {user_data, app_data} from '../data'
import VueCookies from 'vue-cookies'

export default {
  name: 'Navbar',
  data:function(){
    return {
      user_data: user_data,
      app_data: app_data
    }
  },
  computed: {
    firstName:function(){
      return this.user_data.username.split(" ")[0]
    },
    currentDashboard: function () {
      return this.app_data.group === "dashboard"
    },
    currentMeetings: function () {
      return this.app_data.group === "meetings"
    },
    currentTasks: function () {
      return this.app_data.group === "tasks"
    },
    currentTeams: function () {
      return this.app_data.group === "teams"
    }
  },
  methods:{
    logout:function(){
      VueCookies.remove('token');
      VueCookies.remove('invite');
      this.$router.push('login');
      // TODO: fully make this work (no back browsing)
    }
  },
  props: {
    username:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
