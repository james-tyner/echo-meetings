<template>
  <div id="app">
    <Navbar v-bind:pageGroup="pageGroup" v-if="this.pageName !== 'Login'"></Navbar>

    <Header v-bind:pageName="pageName" v-if="this.pageName !== 'Login'"></Header>

    <router-view></router-view>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'

import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import data from './data'

export default {
  name: 'app',
  components: {
    Navbar,
    Header
  },
  methods: {
    checkToken: function () {
      // load token from params
      if (this.$route.name === 'Dashboard') {
        let urlParams = new URLSearchParams(window.location.search);
        let tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
          VueCookies.set('token', tokenFromUrl);
          let url = window.location.href;
          url.replace(/\?token.*/, '');
          history.pushState(null, "", url.replace(/\?token.*/, ''));
          data.updateUser();
        }
      }
      if (!VueCookies.isKey('token')) {
        this.$router.push('login')
      }
    }
  },
  data: function () {
    return {
      pageName: data['page'],
      pageGroup: data["group"]
    }
  },
  watch: {
    $route(to) {
      this.pageName = to.name
      this.pageGroup = to.group
      this.checkToken();
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('from App mounted ' + this.$route.name);
      this.pageName = this.$route.name
      this.pageGroup = this.$route.group
      this.checkToken();
    })
  }
}
</script>

<style lang="scss">
  @import 'styles/styles';
</style>
