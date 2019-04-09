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
          <div class="email-box">
            <div class="email-box__wrapper">
              <span class="email">jianxuat@usc.edu</span>
              <span class="cancel"></span>
            </div>
          </div>
          <p class="new-member" contenteditable="true"></p>
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
export default {
  name: "team-card",
  props: {
    team: Object
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
    }
  },
  data: function () {
    return {
      showAll: false
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
  }

  .email-box {
    margin-right: .33333333em;
    padding: 0;
    vertical-align: baseline;
  }

  .email-box__wrapper {
    align-items: center;
    background-color: #fff;
    border: 1px solid #dadce0;
    border-radius: 10px;
    box-sizing: border-box;
    display: inline-flex;
    height: 20px;
    line-height: 20px;
    margin: 2px 0;
    padding-left: 8px;
    padding-right: 4px;
  }

  .email {
    font-size: .75rem;
    letter-spacing: .3px;
    box-sizing: border-box;
    color: #5f6368;
    font-weight: 500;
    margin: 0;
    max-height: 20px;
    display: inline-block;
  }

  .close {
    background-position: center;
    background-repeat: no-repeat;
    background-size: 16px;
    background-image: url('https://www.gstatic.com/images/icons/material/system/2x/close_black_16dp.png')
  }
</style>
