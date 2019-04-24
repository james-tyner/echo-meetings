<template>
  <main id="edit-meeting-main" class="meeting-main">
    <section id="meeting-form">

      <div id="name" class="input-section">
        <label for="meeting-name">Meeting Name</label>
        <input
          id="meeting-name" type="text" name="name"
          placeholder="Planning extravaganza…"
          v-model="this.thisMeeting.title"
        >
      </div>

      <div id="date-time-block" class="input-section">
        <div id="label-row">
          <label id="date-label" for="meeting-date">Date</label>
          <label id="time-label" for="meeting-time">Time</label>
        </div>

        <div id="field-row">
          <input
            id="meeting-date" type="date" name="name"
            v-model="this.humanDate"
          >
          <div id="at">at</div>
          <input
            id="meeting-time" type="time" name="name"
            v-model="this.humanDate"
          >
        </div>
      </div>

      <div id="location" class="input-section">
        <label for="meeting-loc">Location</label>
        <input
          id="meeting-loc" type="text" name="name"
          placeholder="Timberwolves Room…"
          v-model="this.thisMeeting.location"
        >
      </div>

      <div id="edit-meeting" class="input-section search-bar">
        <label>Team</label>
        <div id="team-search">
          <v-autocomplete
            @focus='resetTeam'
            :items="team_data.all_teams"
            :component-item="TeamSearchTemplate"
            :get-label="getLabel"
            v-model="this.thisMeeting.team"
            class="editable"
            :auto-select-one-item="false"
          ></v-autocomplete>
        </div>
      </div>

      <div class="input-section search-bar">
        <label>Invite</label>
        <div class="invitee-input">
          <v-autocomplete
            :items="availableMembers"
            :component-item="MemberSearchTemplate"
            :get-label="getLabel"
            class="new-member"
            v-model="selected_member"
            :auto-select-one-item="false"
          ></v-autocomplete>
        </div>
      </div>

      <button @click="onSaveMeeting" class="submit-button" type="button">Save Changes</button>
      <button @click="onReset" class="reset-button" type="button">Reset</button>
    </section>
  </main>
</template>

<script>
import Vue from 'vue'
import { team_data, meeting_data } from "../../data";
import TeamSearch from "../../components/meetings/TeamSearchItem"
import MemberSearch from "../../components/meetings/MemberSearchItem"
import MemberBox from "../../components/meetings/MemberBox"
import showAlert from "../../components/ShowAlert"
import moment from 'moment'

export default {
  name: 'edit-meeting',
  components: {
    TeamSearch,
    MemberSearch,
    MemberBox
  },
  data: function () {
    return {
      selected_member: '',
      team_data: team_data,
      TeamSearchTemplate: TeamSearch,
      MemberSearchTemplate: MemberSearch,
      meeting_data:meeting_data,
      old_data:meeting_data
    }
  },
  props:{
    id:String,
  },
  computed: {
    thisMeeting:function(){
      return meeting_data.all_meetings.find(meeting => meeting._id == this.id);
    },
    humanDate: function() {
      var meetingTime = new Date(this.thisMeeting.time).toISOString().substring(0,10); 
      return meetingTime;
      //var dateFormatted = moment(meetingTime).format('L')
    },
    humanTime: function() {
      var meetingTime = new Date(this.thisMeeting.time);
      var timeFormatted = moment(meetingTime).format('LT');
      return timeFormatted;
    },
    availableMembers() {
      if (!this.team) {
        return [];
      } else {
        // team.member - invitees
        let difference = [];
        for (const member of this.team.members) {
          if (!this.invitees.includes(member._id)) {
            difference.push(member)
          }
        }
        return difference;
      }
    }
  },
  watch: {
    selected_member: function (val) {
      // add an invitee
      if (!val || !val._id) {
        return;
      }
      const _id = val._id;
      console.log(val.name);
      if (this.invitees.includes(_id)) {
        return;
      }
      this.invitees.push(_id);
      // create EmailBox comp
      const MemberBox_vue = Vue.extend(MemberBox);
      const memberBox = new MemberBox_vue({
        propsData: {
          editable: true,
          member: val
        }
      });
      memberBox.$on('delete-member', this.onDeleteMember);
      memberBox.$mount();
      this.$el.querySelector('.invitee-input')
        .insertBefore(memberBox.$el, this.$el.querySelector('.invitee-input .v-autocomplete'));
      this.memberbox_instances.push(memberBox);
      this.$nextTick(function () {
        this.selected_member = null;
      });
    }
  },
  mounted: function () {
    team_data.get()
    meeting_data.meeting.get()
    let thisMeeting = meeting_data.all_meetings.find(meeting => meeting._id = this.id);
  },
  methods: {
    getLabel(item) {
      if (!item) return '';
      return item.name
    },
    resetTeam() {
      this.team = '';
      for (const temp of this.memberbox_instances) {
        temp.$el.remove();
        temp.$destroy();
      }
      this.invitees = [];
    },
    onSaveMeeting() {
      if (!this.thisMeeting.title) {
        showAlert('red', 'Meeting name cannot be empty', 2500);
        return;
      }
      if (!this.thisMeeting.team) {
        showAlert('red', 'You must choose a team', 2500);
        return;
      }
      if (!this.time || !this.date) {
        showAlert('red', 'You must pick a time', 2500);
        return;
      }
      const timestamp = moment(`${this.date} ${this.time}`).valueOf();
      meeting_data.meeting.update(this.title, timestamp, this.team._id, this.location, this.invitees);
      this.$router.push(`../details/${this.thisMeeting.id}`)
    },
    onReset() {
      return old_data.all_meetings.find(meeting => meeting._id == this.id);
    },
    onDeleteMember(instance) {
      const _id = instance.member._id;
      for (let i = 0; i < this.invitees.length; i++) {
        if (this.invitees[i] === _id) {
          this.invitees.splice(i, 1);
          break;
        }
      }
      instance.$el.remove();
      instance.$destroy();
    }
  }
}
</script>

<style lang="scss">
  .invitee-input {
    display: flex;
    flex-wrap: wrap;
    margin: -2px 0;
    width: 100%;
    justify-content: left;

    & > div {
      margin-bottom: 12px;
    }

    .new-member {
      flex-grow: 1
    }
  }

  .v-autocomplete {
    .v-autocomplete-input-group {
      .v-autocomplete-input {
        font-size: 1.5em;
        padding: 10px 15px;
        box-shadow: none;
        border: 1px solid #777777;
        width: 100%;
        outline: none;
        background-color: #eee;
      }

      &.v-autocomplete-selected {
        .v-autocomplete-input {
          background-color: #f2fff2;
        }
      }
    }

    .v-autocomplete-list {
      z-index: 10;
      width: 100%;
      text-align: left;
      border-top: none;
      max-height: 400px;
      overflow-y: auto;
      border-bottom: 1px solid #777777;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .v-autocomplete-list-item {
      cursor: pointer;
      background-color: #fff;
      padding: 10px;
      border-bottom: 1px solid #777777;
      border-left: 1px solid #777777;
      border-right: 1px solid #777777;
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #eee;
    }

    abbr {
      opacity: 0.8;
      font-size: 0.8em;
      display: block;
      font-family: sans-serif;
    }
  }

</style>
