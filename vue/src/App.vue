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
import VueCookies from 'vue-cookies';
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
import { app_data, user_data } from './data';

export default {
  name: 'app',
  components: {
    Navbar,
    Header,
  },
  methods: {
    checkToken() {
      // load token from params
      if (this.$route.name === 'Dashboard') {
        const urlParams = new URLSearchParams(window.location.search);
        // invitation codes
        console.log(urlParams);
        const i_code = urlParams.get('invite');
        console.log('invite: ', i_code);
        if (i_code) {
          VueCookies.set('invite', i_code);
          history.pushState(null, '', window.location.href.replace(/\?invite.*/, ''));
        }

        // token
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
          VueCookies.set('token', tokenFromUrl);
          const url = window.location.href;
          url.replace(/\?token.*/, '');
          history.pushState(null, '', url.replace(/\?token.*/, ''));
          user_data.updateUser();
        }
      }
      if (!VueCookies.isKey('token')) {
        this.$router.push('/login');
      }
    },
  },
  data() {
    return {
      user_data,
      app_data,
    };
  },
  watch: {
    $route(to) {
      app_data.updatePage(to.name);
      app_data.updateGroup(to.meta.group);
      this.checkToken();
    },
  },
  created() {
    this.checkToken();
    user_data.updateUser();
  },
  mounted() {
    this.$nextTick(() => {
      console.log(`from App mounted ${this.$route.name}`);
      app_data.updatePage(this.$route.name);
      app_data.updateGroup(this.$route.meta.group);
    });
  },
};
</script>

<style lang="scss">
  @import 'styles/styles';
</style>
