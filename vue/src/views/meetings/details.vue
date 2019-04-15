<template>
  <div>
    <main class="meeting-main">
      <section id="agenda">
        <div class="empty-list-style"  v-if="thisMeeting.agendas.length == 0">
          <h2>One great meeting awaits.</h2>
          <h4>Add an item to your agenda 👇</h4>
        </div>

        <!-- Agenda Item 1 -->
        <AgendaItem v-for="item in thisMeeting.agendas" v-bind:key="item._id" v-bind:id="'agenda-' + item._id" v-bind:agendaItem="item" v-bind:meeting="thisMeeting"></AgendaItem>

        <div class="agenda-item-add-button" v-on:click="addAgendaItem"><i class="material-icons"> add </i></div>

      </section>
    </main>

    <!-- right sidebar -->
    <section class="right-bar">
      <!-- Start/End Button -->
      <div v-if="this.meetingState == 1 && thisMeeting.agendas.length > 0" class="meeting-start-btn" v-on:click="toggleTimer">Start Meeting</div>
      <div v-if="this.meetingState == 2" class="meeting-start-btn meeting-end-btn" v-on:click="toggleTimer">End Meeting</div>
      <div v-if="this.meetingState == 3" class="meeting-start-btn meeting-save-btn" v-on:click="endMeeting">Save Minutes</div>
      <div v-if="this.meetingState == 2" class="meeting-timer">{{this.time}}</div>

      <!-- Agenda Item ToC -->
      <draggable class="agenda-list-div" v-model="thisMeeting.agendas">
        <a v-for="(item,index) in thisMeeting.agendas" :href="'#agenda-' + item._id" class="agenda-list-item">{{index + 1}}. {{item.title}}</a>
      </draggable>
    </section>
  </div>
</template>

<script>
import { meeting_data } from '../../data'
import draggable from "vuedraggable"
import AnimateSave from "../../components/SaveAnimation"
import AgendaItem from "../../components/meetings/AgendaItem"
import Timer from 'easytimer.js';

window.moment = require('moment'); // for use on AgendaItem component

export default {
  name:"meetingDetails",
  components: {
    AgendaItem,
    AnimateSave,
    draggable
  },
  data:function(){
    return {
      meeting_data:meeting_data,
      time:null,
      meetingState:1
    }
  },
  computed:{
    thisMeeting:function(){
      return meeting_data.all_meetings.find(meeting => meeting._id == this.id)
    }
  },
  props:{
    id:String
  },
  methods:{
    toggleTimer:function(){
      if (this.time != null){

      } else {
        this.time = new Timer();
        this.meetingState = 2;
      }
      if (!meetingTimer){
        let meetingTimer = new Timer();
        this.meetingState = 2;
        meetingTimer.on("secondsUpdated", (e) => {
          this.time = meetingTimer.getTimeValues().toString()
        })
      } else {
        meetingTimer.stop()
        this.meetingState = 3;
      }
    },
    addAgendaItem:function(){
      meeting_data.agenda.create(this.id, "New agenda item");
    }
  },
  mounted:function(){
    this.$nextTick(function () {
      meeting_data.meeting.get()
    });
  }
}

</script>
