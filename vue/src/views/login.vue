<template>
  <div id="login-signup-main">
    <div id="logo"><img src="/assets/logo_white.svg" alt="logo-img"></div>
    <div class="login-flex">
      <div class="bg-window">
        <div id="outside-prompt">
          <h1>Get Things Done</h1>
          <p>Whether you're planning the next big event for your club or preparing for a simple team meeting, improve
            your team workflows with Echo. Simply sign in with your Google account to start.</p>

          <a :href="login_url"><img id="google" src="~@/assets/google-sign-in@2x.png" alt="Sign-in with Google"></a>
        </div>
      </div>
      <div class="input-window">
        <div class="input-container">
          <div class="row">
            <div class="text">
              <h3> Create Teams </h3>
              <p>We made team making easy with a simple email invite. Give your team a name and a description, and
                you're ready to start planning meetings.</p>
            </div>
            <div><img src="~@/assets/teams.png" class="image image-right">
            </div>
          </div> <!-- end of row-1 -->

          <div class="row">
            <div>
              <img src="~@/assets/meetings.png" class="image image-left">
            </div>
            <div class="text">
              <h3> Plan Meetings</h3>
              <p>With your team, set a meeting time and organize your meeting notes with agenda items and tasks. Tasks
                can be assigned to different </p>
            </div>
          </div> <!-- end of row-2 -->

          <div class="row">
            <div class="text">
              <h3> Get Tasks Done</h3>
              <p>Echo will remind members throughout the week what tasks need to be completed and provides a handy board
                for each member to view and filter through all their tasks.</p>
            </div>
            <div><img src="~@/assets/tasks.png" class="image image-right">
            </div>
          </div> <!-- end of row-3 -->


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { app_data } from '../data'

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
