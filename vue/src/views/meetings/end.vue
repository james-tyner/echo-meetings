<template>
  <main>
    <div class="confetti-launcher">

    </div>
    <div class="card meeting-end-card">
      <div class="card-header">
        <h2> Congratulations! </h2>
        <p>The <span class="meeting-name-span">{{this.thisMeeting.title}}</span> <span v-if="!this.thisMeeting.title.endsWith('meeting')"> meeting</span> has ended.</p>
        <p>Meeting minutes will be shared with all attendees by email.</p>
      </div>

      <div class="card-body">
        <h1 class="page-title">{{this.thisMeeting.title}}</h1>
        <p class="date"><span class="date-span">{{this.humanDate}}</span></p>

        <div class="agenda-item-list">
          <div class="agenda-item" v-for="item in this.thisMeeting.agendas">
            <h2 style="margin-bottom:0;">{{item.title}}</h2>
            <p class="agenda-item-desc">{{item.description}}</p>
            <small class="agenda-item-notes">{{item.notes}}</small>
            <div v-if="item.tasks.length > 0">
              <TaskRow v-for="(task, index) in item.tasks" v-bind:task="task" v-bind:index="index" :key="task._id"></TaskRow>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-group">
      <router-link :to="{path:'/meetings/create'}"><button class="button create-meeting-btn">Create New Meeting</button></router-link>
      <router-link :to="{path:'/'}"><button class="button dashboard-btn">Return to Dashboard</button></router-link>
    </div>
  </main>
</template>

<script>
import { app_data, meeting_data } from '../../data'
import TaskRow from "../../components/meetings/TaskRow"

export default {
  name:"end-meeting",
  components:{
    TaskRow
  },
  data:function(){
    return {
      meeting_data:meeting_data
    }
  },
  computed:{
    thisMeeting:function(){
      return meeting_data.all_meetings.find(meeting => meeting._id == this.id)
    },
    humanDate: function () {
      var meetingTime = new Date(this.thisMeeting.time);
      var dateFormatted = moment(meetingTime).format('MMMM Do YYYY [at] h:mm a');

      return dateFormatted;
    }
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
  props:{
    id:String
  },
  mounted: function () {
    this.$nextTick(function () {
      meeting_data.meeting.get()
    })
  }
}
</script>
