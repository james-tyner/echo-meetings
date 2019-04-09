<template>
  <div id="app">
    <Navbar v-bind:username="this.firstName" v-if="data.page !== 'Login'"></Navbar>

    <Header v-bind:pageName="data.page" v-if="data.page !== 'Login'"></Header>

    <router-view></router-view>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import { data } from './data'

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
      data
    }
  },
  watch: {
    $route(to) {
      data.updatePage(to.name)
      console.log(to)
      data.updateGroup(to.meta.group)
      this.checkToken();
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('from App mounted ' + this.$route.name);
      data.updatePage(this.$route.name)
      data.updateGroup(this.$route.meta.group)
      this.checkToken();
      data.updateUser();
    })
  }
}
</script>

<style lang="scss">
  @import 'styles/styles';
</style>
