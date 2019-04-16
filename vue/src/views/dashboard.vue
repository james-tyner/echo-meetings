<template>
  <main>
    <section>
      <div class="up-next-div">
        <h2>Up Next</h2>
        <div class="grid-4">
          <div v-for="meeting in truncatedMeetings">
            <router-link :to="`/meetings/details/${meeting._id}`">
              <MeetingCard v-bind:meeting="meeting" v-bind:allTeams="team_data.all_teams"></MeetingCard>
            </router-link>
          </div>
          <!-- <a v-else class="card card-empty">
            <div>
              <h2 class="card-heading">Take a moment to breathe</h2>
              <div class="card-description">
                <span>You have no meetings coming up</span>
              </div>
            </div>
          </a> -->
          <div class="add-meeting-div">
            <router-link to="/meetings/add"><i class="material-icons"> add </i></router-link>
          </div>
        </div>
      </div>
      <div class="task-team-flexbox">
        <div class="tasks-div">
          <h2>Tasks</h2>
          <div v-if="fakeTasks && fakeTasks.length === 0" class="card">
            <div class="task-item-div">
              <input class="task-item-div-input-name" for="task-1" placeholder="Add a new task" type="text" />
              <input class="task-item-div-input-due" for="task-1" placeholder="Due..." type="text" />
              <select id="task-1">
                <option value="1">Not Started</option>
                <option value="2">In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
          </div>
          <div v-else class="card">
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
              <label for="task-2">Update program brainstorm class page</label>
              <p class="task-due task-progress">12/01/18</p>
              <select id="task-2">
                <option value="1" selected>Not Started</option>
                <option value="2">In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
            <div class="task-item-div">
              <label for="task-3">Create Workspace Filtering dropdown</label>
              <p class="task-due">12/01/18</p>
              <select id="task-3">
                <option value="1" selected>Not Started</option>
                <option value="2">In Progress</option>
                <option value="3">Done</option>
              </select>
            </div>
          </div>
        </div>

        <div class="team-div">
          <h2>Teams</h2>
          <div v-if="truncatedTeams.length > 0">
            <TeamGrouping v-for="team in truncatedTeams" v-bind:team="team"></TeamGrouping>
          </div>
          <div v-else>
            <p>You’re not part of any teams yet</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>

import { meeting_data, team_data, task_data } from '../data';
import MeetingCard from "../components/dashboard/MeetingCard"
import TeamGrouping from "../components/dashboard/TeamGrouping"


export default {
  name: 'dashboard',
  components:{
    MeetingCard,
    TeamGrouping
  },
  data:function(){
    return {
      task_data:task_data,
      team_data:team_data,
      meeting_data:meeting_data
    }
  },
  computed:{
    truncatedMeetings:function(){
      return this.meeting_data.all_meetings.slice(0,3)
    },
    truncatedTeams:function(){
      return this.team_data.all_teams.slice(0,3)
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      meeting_data.meeting.get();
      team_data.get();
      task_data.get();
    })
  }
}
</script>
