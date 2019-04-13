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
      <div id="meeting-start-btn">Start Meeting</div>

      <!-- Agenda Item ToC -->
      <div class="agenda-list-div">
        <div class="agenda-list-item active"> Fundraising</div>
        <div class="agenda-list-item"> Touch Base with Charity</div>
        <div class="agenda-list-item"> Promote Event</div>
      </div>
    </section>
  </div>
</template>

<script>
import { meeting_data } from '../../data'
import AgendaItem from "../../components/meetings/AgendaItem"

export default {
  name:"meetingDetails",
  components: {
    AgendaItem
  },
  data:function(){
    return {
      meeting_data: meeting_data
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
  mounted:function(){
    this.$nextTick(function () {
      meeting_data.meeting.get()
    });
  }
}

</script>
