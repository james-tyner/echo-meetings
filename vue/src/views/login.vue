<template>
  <div id="login-signup-main">
      <div class="bg-window">
        <div id="logo"><img src="~@/assets/logo_white.svg" alt="logo-img"></div>
        <div id="outside-prompt">
          <h1>Get things done.</h1>
          <p>Whether you're planning the next big event for your club or preparing for a simple team meeting, improve your team’s workflow with <strong>echo</strong>.</p>

          <a :href="login_url"><img id="google" src="~@/assets/google-sign-in@2x.png" alt="Sign-in with Google"></a>
        </div>
      </div>

      <div class="input-container">
        <div class="row">
          <div class="text">
            <h3>Bring your team together</h3>
            <p>Invite members by email, give your team a name and a description, and you're ready to start planning meetings.</p>
          </div>
          <img src="~@/assets/teams.png" class="image image-right">
        </div> <!-- end of row-1 -->

        <hr>

        <div class="row">
          <img src="~@/assets/meetings.png" class="image image-left">
          <div class="text">
            <h3>Get everyone on the same page</h3>
            <p>Set a time to meet, then organize your meeting with agenda items and tasks. Once the meeting is over, your agenda and notes automatically turn into meeting minutes sent to every attendee.</p>
          </div>
        </div> <!-- end of row-2 -->

        <hr>

        <div class="row">
          <div class="text">
            <h3>Know exactly what to do</h3>
            <p><strong>echo</strong> will remind your teammates of what they need to do by email. The Tasks view always shows you what’s been done and what comes next.</p>
          </div>
          <img src="~@/assets/tasks.png" class="image image-right">
        </div> <!-- end of row-3 -->
      </div>
  </div>
</template>

<script>
import { app_data } from '../data';

export default {
  name: 'login',
  data() {
    return {
      back_url: app_data.back_url,
    };
  },
  computed: {
    login_url() {
      return `${this.back_url}/auth/google`;
    },
  },
};
</script>

<style lang="scss">

</style>
