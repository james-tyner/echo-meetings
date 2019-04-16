<template>
  <div id="login-signup-main">
    <div id="logo"><img src="/assets/logo_white.svg" alt="logo-img"></div>
    <div class="login-flex">
      <div class="bg-window">
        <div id="outside-prompt">
          <h1 class="heading1">Streamline Your Meetings</h1>
          <p>Whether you're planning the next big event for your club or preparing for a simple team meeting, improve your team workflows with Echo. Simply sign in with your Google account to start.</p>
         
          <a :href="login_url"><img id="google" src="/assets/google-sign-in@2x.png" alt="Sign-in with Google"></a>
        </div>
      </div>
      <div class="input-window">
         <div id="input-container">

            <div class="row">
              <div class="text">
                <p class="heading3"> Create Teams </p>
                <p>Start by inviting members via email to your team.</p>
              </div>
              <div><img src="/assets/teams.png" class="card-shadow image-1">
              </div>
            </div> <!-- end of row-1 -->

            <div class="row">
              <div>
                <img src="/assets/meetings.png" class="card-shadow image-1">
              </div>
              <div class="text">
                <p class="heading3"> Plan Meetings</p>
                <p>With your team, set a meeting time and organize your meeting notes with agenda items and tasks.</p>
              </div>
            </div> <!-- end of row-2 -->

            <div class="row">
              <div class="text">
                <p class="heading3"> Share Tasks</p>
                <p>Assign different tasks from the meeting to your group members.</p>
              </div>
              <div><img src="/assets/tasks.png" class="card-shadow image-1">
              </div>
            </div> <!-- end of row-3 -->
          
          
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
