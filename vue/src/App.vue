<template>
  <div id="app">
    <Navbar v-bind:username="user_data.firstName" v-if="app_data.page !== 'Login'"></Navbar>

    <Header v-bind:pageName="app_data.page" v-if="app_data.page !== 'Login'"></Header>

    <router-view></router-view>

    <div id="alert-modal">
      <p></p>

    </div>
  </div>
</template>

<script>
import VueCookies from 'vue-cookies'
import Navbar from './components/Navbar.vue'
import Header from './components/Header.vue'
import {app_data, user_data} from './data'

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
        // invitation codes
        console.log(urlParams);
        let i_code = urlParams.get('invite');
        console.log('invite: ', i_code);
        if (i_code) {
          VueCookies.set('invite', i_code);
          history.pushState(null, "", window.location.href.replace(/\?invite.*/, ''));
        }

        // token
        let tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
          VueCookies.set('token', tokenFromUrl);
          let url = window.location.href;
          url.replace(/\?token.*/, '');
          history.pushState(null, "", url.replace(/\?token.*/, ''));
          user_data.updateUser();
        }
      }
      if (!VueCookies.isKey('token')) {
        this.$router.push('login')
      }
    }
  },
  data: function () {
    return {
      user_data: user_data,
      app_data: app_data
    }
  },
  watch: {
    $route(to) {
      app_data.updatePage(to.name)
      app_data.updateGroup(to.meta.group)
      this.checkToken();
    }
  },
  created: function () {
    this.checkToken();
    user_data.updateUser();
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('from App mounted ' + this.$route.name);
      app_data.updatePage(this.$route.name)
      app_data.updateGroup(this.$route.meta.group)
    })
  }
}
</script>

<style lang="scss">
  @import 'styles/styles';
</style>
