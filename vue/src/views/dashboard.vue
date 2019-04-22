<template>
  <main>
    <section>
      <div class="up-next-div">
        <h2>Up Next</h2>
        <div v-if="truncatedMeetings.length > 0" class="grid-4">
          <div
            v-for="meeting in truncatedMeetings"
            :key="meeting._id"
          >
            <router-link :to="`/meetings/details/${meeting._id}`">
              <MeetingCard
                v-bind:meeting="meeting"
                v-bind:allTeams="team_data.all_teams"
              ></MeetingCard>
            </router-link>
          </div>
          <div class="add-meeting-div">
            <router-link to="/meetings/add"><i class="material-icons"> add </i></router-link>
          </div>
        </div>

        <div v-else class="grid-4">
          <div class="card card-empty">
            <h2 class="card-heading">Take a moment to breathe</h2>
            <div class="card-description">
              <span>You have no meetings coming up</span>
            </div>
          </div>

          <div class="add-meeting-div">
            <router-link to="/meetings/add"><i class="material-icons"> add </i></router-link>
          </div>
        </div>
      </div>
      <div class="task-team-flexbox">
        <div class="tasks-div">
          <h2>Tasks</h2>
          <div class="card">
            <div v-if="truncatedTasks.length > 0">
              <TaskRow
                v-for="(task,index) in truncatedTasks"
                v-bind:task="task"
                v-bind:index="index"
                :key="index"
              ></TaskRow>
            </div>

            <div v-else>
              <div class="task-item-div zero-tasks">
                <label>There are no tasks assigned to you… rejoice! 🙌</label>
              </div>
            </div>

          </div>
        </div>

        <div class="team-div">
          <h2>Teams</h2>
          <div v-if="truncatedTeams.length > 0">
            <TeamGrouping
              v-for="team in truncatedTeams"
              v-bind:team="team"
              :key="team._id"
            ></TeamGrouping>
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
import TaskRow from "../components/dashboard/TaskRow"

// THIS WORKS ONLY FOR MEETINGS
function compareMeetings(a, b) {
  // Use toUpperCase() to ignore character casing
  const timeA = a.time;
  const timeB = b.time;

  let comparison = 0;
  if (timeA > timeB) {
    comparison = 1;
  } else if (timeA < timeB) {
    comparison = -1;
  }
  return comparison;
}

// THIS WORKS ONLY FOR TASKS
function compareTasks(a, b) {
  // Use toUpperCase() to ignore character casing
  const timeA = a.due;
  const timeB = b.due;

  let comparison = 0;
  if (timeA > timeB) {
    comparison = 1;
  } else if (timeA < timeB) {
    comparison = -1;
  }
  return comparison;
}

// THIS WORKS ONLY FOR TEAMS
function compareTeams(a, b) {
  const updateA = new Date(a.updatedAt)
  const updateB = new Date(b.updatedAt)

  let comparison = 0;
  if (updateA > updateB) {
    comparison = 1
  } else if (updateA < updateB) {
    comparison = -1
  }

  return comparison;
}

export default {
  name: 'dashboard',
  components: {
    MeetingCard,
    TeamGrouping,
    TaskRow
  },
  data: function () {
    return {
      task_data: task_data,
      team_data: team_data,
      meeting_data: meeting_data
    }
  },
  computed: {
    truncatedMeetings: function () {
      let allMeetings = this.meeting_data.all_meetings;

      const now = Date.now();

      let futureMeetings = allMeetings.filter(meeting => meeting.time > now)
      futureMeetings.sort(compareMeetings);
      return futureMeetings.slice(0, 3)
    },
    truncatedTeams: function () {
      let sortedTeams = this.team_data.all_teams;
      sortedTeams.sort(compareTeams);
      sortedTeams.reverse()
      return sortedTeams.slice(0, 4);
    },
    truncatedTasks: function () {
      let allTasks = this.task_data.all_tasks;
      allTasks.filter(task => task.status !== 2);
      allTasks.sort(compareTasks);
      return allTasks.slice(0, 6); //only the next 5 tasks that aren't done yet
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
