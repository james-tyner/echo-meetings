<template>
  <div>
    <main class="meeting-main">
      <section id="agenda">
        <!-- Agenda Item 1 -->
        <AgendaItem v-for="item in thisMeeting.agendas" v-bind:key="item._id" v-bind:agendaItem="item" v-bind:meeting="thisMeeting"></AgendaItem>

      </section>
    </main>

    <!-- right sidebar -->
    <section class="right-bar">
      <!-- Start/End Button -->
      <div v-if="this.meetingState == 1" class="meeting-start-btn" v-on:click="toggleTimer">Start Meeting</div>
      <div v-if="this.meetingState == 2" class="meeting-start-btn meeting-end-btn" v-on:click="toggleTimer">End Meeting</div>
      <div v-if="this.meetingState == 3" class="meeting-start-btn meeting-save-btn" v-on:click="endMeeting">Save Minutes</div>
      <div v-if="this.meetingState == 2" class="meeting-timer">{{this.time}}</div>

      <!-- Agenda Item ToC -->
      <draggable class="agenda-list-div" v-model="thisMeeting.agendas">
        <div v-for="(item,index) in thisMeeting.agendas" class="agenda-list-item">{{index + 1}}. {{item.title}}</div>
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

export default {
  name:"meetingDetails",
  components: {
    AgendaItem,
    AnimateSave,
    draggable
  },
  data:function(){
    return {
      meeting_data: meeting_data,
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
    }
  },
  mounted:function(){
    this.$nextTick(function () {
      meeting_data.meeting.get()
    });
  }
}

</script>
