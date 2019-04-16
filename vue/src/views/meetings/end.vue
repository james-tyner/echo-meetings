<template>
  <main>
    <div class="confetti-launcher">

    </div>
    <div class="card meeting-end-card">
      <div class="card-header">
        <h2> Congratulations! </h2>
        <p>The <span class="meeting-name-span">{{this.thisMeeting.title}}</span> meeting has ended.</p>
        <p>Meeting minutes will be shared with all attendees by email.</p>
      </div>

      <div class="card-body">
        <h1 class="page-title">{{this.thisMeeting.title}}</h1>
        <p class="date"><span class="date-span">{{this.humanDate}}</span></p>

        <div class="agenda-item-list">
          <div class="agenda-item">
            <h3>Agenda Item One:</h3>
            <div class="tasks-div">
              <div class="task-item-div">
                <label for="task-1">Support color token autocomplete in filter</label>
                <p class="task-due task-upcoming">12/01/18</p>
                <select id="task-1">
                  <option value="1">Not Started</option>
                  <option value="2" selected>In Progress</option>
                  <option value="3">Done</option>
                </select>
              </div>
              <div class="task-item-div">
                <label for="task-1">Update program brainstorm class page</label>
                <p class="task-due task-progress">12/01/18</p>
                <select id="task-1">
                  <option value="1" selected>Not Started</option>
                  <option value="2">In Progress</option>
                  <option value="3">Done</option>
                </select>
              </div>
            </div>
          </div>
          <div class="agenda-item">
            <h3>Agenda Item One:</h3>
            <div class="tasks-div">
              <div class="task-item-div">
                <label for="task-1">Support color token autocomplete in filter</label>
                <p class="task-due task-upcoming">12/01/18</p>
                <select id="task-1">
                  <option value="1">Not Started</option>
                  <option value="2" selected>In Progress</option>
                  <option value="3">Done</option>
                </select>
              </div>
              <div class="task-item-div">
                <label for="task-1">Update program brainstorm class page</label>
                <p class="task-due task-progress">12/01/18</p>
                <select id="task-1">
                  <option value="1" selected>Not Started</option>
                  <option value="2">In Progress</option>
                  <option value="3">Done</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
    <div class="button-group">
      <button class="button create-meeting-btn"><router-link :to="{path:'/meetings/create'}">Create New Meeting</router-link></button>
      <button class="button dashboard-btn"><router-link :to="{path:'/'}">Return to Dashboard</router-link></button>
    </div>
  </main>
</template>

<script>
import { meeting_data } from '../../data'

export default {
  name:"end-meeting",
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
