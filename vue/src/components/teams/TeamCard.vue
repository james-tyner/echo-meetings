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
        <div class="new-member-input">
          <EmailBox
                  v-for="invitation in team.invitations"
                  :key='invitation._id'
                  :email="invitation.email"
                  :editable="false"
          ></EmailBox>
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
import SaveAnimation from "../SaveAnimation";
import showAlert from "../ShowAlert";

export default {
  name: "team-card",
  props: {
    team: Object
  },
  components: {
    EmailBox
  },
  mixins: [
    SaveAnimation
  ],
  data: function () {
    return {
      lastSavedDescription: this.team.description,
      showAll: false,
      email_input_focused: false,
      email_input: '',
      invitation_list: [],
      emailbox_instances: []
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
      if (this.lastSavedDescription === description) return;
      this.lastSavedDescription = description;
      team_data.put(this.team._id, null, description)
    },

    addEmail() {
      const email = this.email_input;
      if (this.invitation_list.includes(email)) return;
      for (const member of this.team.members) {
        if (member.email === email) {
          showAlert("red", `${email} is already in ${this.team.name}`, 2500);
          return;
        }
      }
      for (const invitation of this.team.invitations) {
        if (invitation.email === email) {
          showAlert("red", `${email} has already been invited to ${this.team.name}`, 2500);
          return;
        }
      }
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!email.match(regex)) {
        showAlert("red", "That’s not a valid email address", 2500);
        return;
      }

      console.log('adding email ' + email);
      // add to list in data
      this.invitation_list.push(email);
      // create EmailBox comp
      const EmailBox_vue = Vue.extend(EmailBox);
      const emailBox = new EmailBox_vue({
        propsData: {
          editable: true,
          email: email
        }
      });
      emailBox.$on('delete-email', this.onDeleteEmail);
      emailBox.$mount();
      // add comp to dom
      this.$el.querySelector('.new-member-input')
        .insertBefore(emailBox.$el, this.$el.querySelector('.new-member-input textarea'));

      this.emailbox_instances.push(emailBox);

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
      for (let i = 0; i < this.emailbox_instances.length; i++) {
        if (this.emailbox_instances[i].email === instance.email) {
          this.emailbox_instances.splice(i, 1);
          break;
        }
      }
      instance.$el.remove();
      instance.$destroy();
    },

    sendInvitation() {
      if (this.invitation_list.length < 0) return;
      const ready_to_sent = this.invitation_list.slice(0);
      for (const temp of this.emailbox_instances) {
        temp.$el.remove();
        temp.$destroy();
      }
      this.emailbox_instances = [];
      this.invitation_list = [];
      console.log(ready_to_sent);
      team_data.invite(this.team._id, ready_to_sent)
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
