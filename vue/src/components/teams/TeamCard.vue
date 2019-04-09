<template>
  <div class="card team-card" :class="colorBand">
    <h2 class="card-heading" v-on:click="toggle()">{{team.name}}</h2>
    <div class="team-info" v-if="showAll">
      <p class="team-desc" contenteditable="true">{{team.description}}</p>
      <div class="team-members">
        <div v-for="member in team.members" class="member">
          <div class="profile-photo" :style="{ 'background-image' : 'url(' + member.avatar + ')'}"></div>
          <p class="member-name">{{member.name}}</p>
        </div>
        <div class="member new-member-input">
          <EmailBox email="jianxuat@usc.edu" @delete_email="onDeleteEmail(1)"></EmailBox>
          <textarea
                  name="new-member-email-textarea"
                  class="new-member" rows="1"
                  v-model='email_input'
                  @keydown.tab.stop.prevent="addEmail"
                  @keydown.enter.stop.prevent="addEmail"
          >
          </textarea>
          <button>SEND</button>
        </div>
      </div>
    </div>
    <div v-else v-on:click="toggle()" class="team-photos">
      <div class="profile-photo" v-for="member in team.members"
           :style="{ 'background-image': 'url(' + member.avatar + ')' }"></div>
    </div>
  </div>
</template>

<script>

import EmailBox from './EmailBox'

export default {
  name: "team-card",
  props: {
    team: Object
  },
  components: {
    EmailBox
  },
  computed: {
    colorBand: function () {
      return (this.team.color + '-color-band')
    },
    teamText: function () {
      return (this.team.color)
    }
  },
  methods: {
    toggle() {
      this.showAll = !this.showAll
    },
    addEmail() {
      console.log('adding email ' + this.email_input);
      this.email_input = '';
      // create EmailBox comp
      console.log(this.$el);
    },
    onDeleteEmail(event) {
      console.log(event);
    }
  },
  data: function () {
    return {
      showAll: false,
      email_input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .new-member-input {
    display: flex;
    flex-wrap: wrap;
    margin: -2px 0;
    width: 100%;
    justify-content: left;

    .new-member {
      flex-grow: 1;
    }
  }
</style>
