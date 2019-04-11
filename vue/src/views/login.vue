<template>
  <div id="login-signup-main">
    <div id="logo"><img src="/assets/logo_white.svg" alt="logo-img"></div>
    <div class="login-flex">
      <div class="bg-window">
        <div id="outside-prompt">
          <p>Login in with your Google Account to start organizing your meetings</p>
        </div>
      </div>
      <div class="input-window">
        <div id="input-container">
          <!--          <h1>Welcome back!</h1>-->
          <a :href="login_url"><img id="google" src="/assets/google-sign-in@2x.png" alt="Sign-in with Google"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {app_data} from '../data'

export default {
  name: 'login',
  data: function () {
    return {
      back_url: app_data.back_url
    }
  },
  computed: {
    login_url: function () {
      return this.back_url + '/auth/google'
    }
  }
}
</script>

<style lang="scss">

</style>
