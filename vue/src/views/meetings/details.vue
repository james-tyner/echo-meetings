<template>
  <div>
    <main class="meeting-main">
      <section id="agenda">
        <div class="empty-list-style" v-if="thisMeeting.agendas.length === 0">
          <h2>One great meeting awaits.</h2>
          <h4>Add an item to your agenda 👇</h4>
        </div>

        <!-- Agenda Item 1 -->
        <AgendaItem v-for="item in thisMeeting.agendas"
                    v-bind:key="item._id"
                    v-bind:id="'agenda-' + item._id"
                    v-bind:meeting="thisMeeting"
                    v-bind:agendaItem="item"
        ></AgendaItem>

        <div class="agenda-item-add-button" v-on:click="addAgendaItem"><i class="material-icons"> add </i></div>

      </section>
    </main>

    <!-- right sidebar -->
    <section class="right-bar">
      <!-- Start/End Button -->
      <div class="meeting-edit-btn" 
        v-on:click="editMeeting">Edit Details
      </div>
      <div v-if="this.meetingState === 1 && thisMeeting.agendas.length > 0" class="meeting-start-btn"
           v-on:click="startTimer">Start Meeting
      </div>
      <div v-if="this.meetingState === 2" class="meeting-start-btn meeting-pause-btn" v-on:click="pauseTimer">Pause
      </div>
      <div v-if="this.meetingState === 2" class="meeting-start-btn meeting-end-btn" v-on:click="endMeeting">
        <router-link :to="{ path: `/meetings/end/${this.id}`, params: {id: this.id, duration:this.meetingLength} }">
          End
        </router-link>
      </div>
      <div v-if="this.meetingState === 3" class="meeting-start-btn" v-on:click="resumeTimer">Resume</div>
      <h2 v-if="this.meetingState >= 2" class="meeting-timer">{{this.meetingTimer}}</h2>

      <!-- Agenda Item ToC -->
      <draggable
        class="agenda-list-div"
        v-model="thisMeeting.agendas"
        :move="onSort"
      >
        <a
          v-for="(item,index) in thisMeeting.agendas"
          :href="'#agenda-' + item._id"
          class="agenda-list-item"
        >
          {{index + 1}}. {{item.title}}
        </a>
      </draggable>

      <div id="meeting-modify-icons">
        <!-- <i class="far fa-edit" v-on:click="editMeeting" v-tooltip="{offset: '5', hideOnTargetClick: false, content: 'Edit Meeting'}"></i> -->
        <i
          class="far fa-trash-alt"
          :class="deleteMeetingConfirmed ? 'danger' : ''"
          @click="deleteMeeting"
          v-tooltip="{
            offset: '5',
            hideOnTargetClick: false,
            content: deleteMeetingConfirmed ? 'Click again to delete meeting' : 'Click twice to delete meeting',
            classes: deleteMeetingConfirmed ? 'danger-bg' : ''
            }"
        ></i>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
  .fa-trash-alt.danger {
    color: #f53900 !important;
  }
</style>
<script>
import { app_data, meeting_data } from '../../data'
import draggable from "vuedraggable"
import AnimateSave from "../../components/SaveAnimation"
import showAlert from "../../components/ShowAlert"
import AgendaItem from "../../components/meetings/AgendaItem"
import debounce from 'lodash.debounce'

window.moment = require('moment'); // for use on AgendaItem component
let meetingCount; // declared to use within

export default {
  name: "meetingDetails",
  components: {
    AgendaItem,
    AnimateSave,
    draggable
  },
  data: function () {
    return {
      meeting_data: meeting_data,
      meetingLength: null, // in seconds
      meetingState: 1, // 1 = working, 2 = started, 3 = paused, 4 = ended
      pausedLength: null,
      deleteMeetingConfirmed: false
    }
  },
  computed: {
    thisMeeting: function () {
      const find = meeting_data.all_meetings.find(meeting => meeting._id === this.id);
      return find ? find : { agendas: [] };
    },
    meetingTimer: function () {
      return moment().hour(0).minute(0).second(this.meetingLength).format('m [min] s [s]');
    }
  },
  props: {
    id: String
  },
  watch: {
    thisMeeting: function () {
      this.$nextTick(function () {
        if (this.thisMeeting.title) {
          app_data.updatePage(this.thisMeeting.title);
          document.title = `${this.thisMeeting.title} - echo`
        }
      });
    }
  },
  created: function () {
    this.debouncedUpdateOrder = debounce(this.updateOrder, 500)
  },
  methods: {
    onSort: function (event) {
      console.log(`${this.thisMeeting.agendas[event.draggedContext.index].title} is dragged to ${event.relatedContext.index}`);
      this.debouncedUpdateOrder(this.thisMeeting.agendas[event.draggedContext.index]._id, event.relatedContext.index);
    },
    updateOrder(agenda_id, order) {
      meeting_data.agenda.update(this.thisMeeting._id, agenda_id, null, null, null, order)
    },
    startTimer: function () {
      this.meetingLength = 0;
      meetingCount = setInterval(() => {
        this.meetingLength++;
      }, 1000);
      this.meetingState = 2;
    },
    pauseTimer: function () {
      this.meetingState = 3;
      this.pausedLength = this.meetingLength;
      clearInterval(meetingCount);
    },
    resumeTimer: function () {
      this.meetingState = 2;
      this.meetingLength = this.pausedLength;
      meetingCount = setInterval(() => {
        this.meetingLength++;
      }, 1000);
    },
    endMeeting: function () {
      let emails = [];
      for (const invitee of this.thisMeeting.invitees) {
        emails.push(invitee.email);
      }

      var meetingDate = new Date(this.thisMeeting.time);
      meetingDate = moment(meetingDate).format('MMMM Do YYYY [at] h:mm a');

      meeting_data.meeting.sendRecap(this.id, emails, meetingDate);
      this.$router.push({ path: `/meetings/end/${this.id}`, params: { id: this.id } });
    },
    addAgendaItem: function () {
      meeting_data.agenda.create(this.id, "New agenda item");
    },
    deleteMeeting: function () {
      if (this.deleteMeetingConfirmed) {
        meeting_data.meeting.delete(this.id);
        showAlert("red", `Deleted ${this.thisMeeting.title}`);
        this.$router.push({ path: "/meetings" });
      } else {
        this.deleteMeetingConfirmed = true;
      }
    },
    editMeeting: function () {
      this.$router.push({ path: `/meetings/edit/${this.id}`, params: { id: this.id } });
    },
    handleClick: function (event) {
      if (event.target && !event.target.classList.contains('fa-trash-alt')) {
        this.deleteMeetingConfirmed = false;
      }
    }
  },
  mounted: function () {
    window.addEventListener('click', this.handleClick);
    this.$nextTick(function () {
      meeting_data.meeting.get();
    });
  },
  beforeDestroy: function () {
    window.removeEventListener('click', this.handleClick)
  }
}

</script>
