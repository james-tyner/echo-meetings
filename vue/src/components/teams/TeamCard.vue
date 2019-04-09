<template>
  <div class="card team-card" :class="colorBand">
    <h2 class="card-heading" v-on:click="toggle()">{{team.name}}</h2>
    <div class="team-info" v-if="showAll">
      <textarea
              class="editable team-desc"
              placeholder="Description"
              v-model='team.description'
      >
      </textarea>
      <div class="team-members">
        <div v-for="member in team.members" class="member">
          <div class="profile-photo" :style="{ 'background-image' : 'url(' + member.avatar + ')'}"></div>
          <p class="member-name">{{member.name}}</p>
        </div>
        <div class="member new-member-input">
          <textarea
                  name="new-member-email-textarea"
                  class="new-member editable" rows="1"
                  placeholder="Invite members by email"
                  v-model='email_input'
                  @keydown.tab.stop.prevent="addEmail"
                  @keydown.enter.stop.prevent="addEmail"
                  @focusin="email_input_focused = true"
                  @focusout="email_input_focused = false"
          >
          </textarea>
          <button v-if="(email_input_focused && invitation_list.length > 0) || invitation_list.length > 0"
                  @click="sendInvitation">SEND
          </button>
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
import Vue from 'vue'
import EmailBox from './EmailBox'
import debounce from 'lodash.debounce'
import {team_data} from "../../data";

export default {
  name: "team-card",
  props: {
    team: Object
  },
  components: {
    EmailBox
  },
  data: function () {
    return {
      showAll: false,
      email_input_focused: false,
      email_input: '',
      invitation_list: []
    }
  },
  watch: {
    team: {
      handler: function (val, oldVal) {
          this.debouncedUpdateDescription(val.description, oldVal.description)
      },
      deep: true
    }
  },
  created: function () {
    this.debouncedUpdateDescription = debounce(this.updateDescription, 1000)
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
    updateDescription(description, old) {
      if(old!==description)
      console.log(description);
      team_data.put(this.team._id, null, description)
    },

    addEmail() {
      const email = this.email_input;
      if (this.invitation_list.includes(email)) return;
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!email.match(regex)) return;

      console.log('adding email ' + email);
      // add to list in data
      this.invitation_list.push(email);
      // create EmailBox comp
      const EmailBox_vue = Vue.extend(EmailBox);
      const emailBox = new EmailBox_vue({
        propsData: {
          email: email
        }
      });
      emailBox.$on('delete-email', this.onDeleteEmail);
      emailBox.$mount();
      // add comp to dom
      this.$el.querySelector('.new-member-input')
        .insertBefore(emailBox.$el, this.$el.querySelector('.new-member-input textarea'));
      // clear
      this.email_input = '';
    },

    onDeleteEmail(instance) {
      for (let i = 0; i < this.invitation_list.length; i++) {
        if (this.invitation_list[i] === instance.email) {
          this.invitation_list.splice(i, 1);
          break;
        }
      }
      instance.$el.remove();
      instance.$destroy();
    },

    sendInvitation() {
      if (this.invitation_list.length < 0) return;
      console.log(this.invitation_list);
      // TODO send invitation from API
    }
  }
}
</script>

<style lang="scss" scoped>

  textarea.editable {
    border: none;
    background: transparent;
    outline: none;
    resize: none;

    &:focus {
      border: 0 !important;
    }
  }

  .new-member-input {
    display: flex;
    flex-wrap: wrap;
    margin: -2px 0;
    width: 100%;
    justify-content: left;

    .new-member {
      flex-grow: 1;
    }

    textarea.new-member.editable {
      height: 28px;
      padding-top: 6px;
      font-size: 14px;
    }

    button {
      outline: none;
      box-shadow: none;
      font-size: 12px;
      border: none;
      color: #00D9BD;
      background-color: #fff;
      letter-spacing: 0.11rem;
      height: 24px;
      width: 55px;
      border-radius: 12px;
      padding: 2px 0 0;
      margin: 0;

      &:hover {
        color: #fff;
        background-color: #00D9BD;
      }
    }
  }
</style>
