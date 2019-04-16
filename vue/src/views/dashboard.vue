<template>
  <main>
    <section>
      <div class="up-next-div">
        <h2>Up Next</h2>
        <div class="grid-4">
          <div v-if="meetings_data.all_meetings && meetings_data.all_meetings.length > 0">
            <div v-for="meeting in meetings_data.all_meetings">
              <router-link :to="`/meeting/details/${meeting.id}`" class="card">
                <div>
                  <h2 class="card-heading">{{ meeting.title }}</h2>
                  <p class="card-date">{{ time }}</p>
                  <div class="card-description">
                    <div class="team-members">
                      <div v-for="meeting_user in meeting.team.members">
                        <div class="member-img-div">
                          <img v-bind:src="meeting_user.avatar" v-bind:alt="meeting_user.name">
                        </div>
                      </div>
                    </div>
                    <h3 class="card-team blue">{{ meeting.location }}</h3>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <a v-else class="card card-empty">
            <div>
              <h2 class="card-heading">Take a moment to breathe</h2>
              <div class="card-description">
                <span>You have no meetings coming up</span>
              </div>
            </div>
          </a>
          <div class="add-meeting-div">
            <a href="#"><i class="material-icons"> add </i></a>
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
          <h2>Team</h2>
          <div v-if="team_data.all_teams && team_data.all_teams.length > 0">
            <div v-for="team in team_data.all_teams">
              <div class="team">
                <h3 class="team-name">{{ team.name }}</h3>
                <h4 class="group-name green">{{ team.description }}</h4>
                <div class="team-members" v-for="team_member in team.members">
                  <div class="member-img-div">
                    <img v-bind:src="team_member.avatar" v-bind:alt="'profile-img-' + team_member.name">
                  </div>
                </div>
              </div>
            </div>
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

import { meetings_data, team_data, tasks_data } from '../data';

export default {
  name: 'dashboard',

  mounted: function () {
    this.$nextTick(() => {
      console.log('from ' + this.$route.name);
      meetings_data.get()
      team_data.get()
    })
  },

  data() {
    return {
      tasks_data,
      team_data,
      meetings_data,

      fakeTasks:[
        // {
        //   "id": 1,
        //   "name": "Finish A11",
        //   "description": "need to finish",
        //   "due": 1553479225106,
        //   "status": 1,
        //   "assignees":[{
        //     "name": "Tommy Trojan",
        //     "username": "trojan.echo",
        //     "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
        //   }, {
        //     "name": "Mars Tan",
        //     "username": "mars.tanjx",
        //     "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
        //   }],
        //   "team":{
        //     "id": 1,
        //     "color":"blue",
        //     "name": "Team Echo",
        //     "description": "This team isn't even real.",
        //     "members": [{
        //       "name": "Tommy Trojan",
        //       "username": "trojan.echo",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/women/65.jpg"
        //     }, {
        //       "name": "Mars Tan",
        //       "username": "mars.tanjx",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/men/62.jpg"
        //     }]
        //   }
        // },
        // {
        //   "id": 2,
        //   "name": "Finish Everything",
        //   "description": "please finish everything",
        //   "due": 1554867187000,
        //   "status": 2,
        //   "assignees":[{
        //     "name": "Courtney Dunlap",
        //     "username": "trojan.echo",
        //     "avatar": "https://randomuser.me/api/portraits/thumb/men/63.jpg"
        //   }],
        //   "team":{
        //     "id": 2,
        //     "color":"red",
        //     "name": "Dance Club",
        //     "description": "This team is super not real.",
        //     "members": [{
        //       "name": "Courtney Dunlap",
        //       "username": "trojan.echo",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/men/63.jpg"
        //     }, {
        //       "name": "James Tyner",
        //       "username": "james",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/women/72.jpg"
        //     }, {
        //       "name": "Joy Verve",
        //       "username": "joy",
        //       "avatar": "https://randomuser.me/api/portraits/thumb/women/42.jpg"
        //     }]
        //   }
        // }
      ]
    }
  }
}
</script>
