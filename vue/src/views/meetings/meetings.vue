<template>
  <main>
    <section class="filter-bar-container">
      <div class="filterbar">
        <div class="filter-title"> Filter by team:</div>
        <div class="options">
          <a class="filter-group" v-on:click="selectedTeam = ''"
             v-bind:class="{'selected' : selectedTeam === ''}">ALL</a>
          <a v-for="team in this.allTeamNames" class="filter-group" v-on:click="selectedTeam = team"
             v-bind:class="{'selected' : selectedTeam === team}">{{team}}</a>
        </div> <!-- #options -->
      </div> <!-- #filterbar -->
    </section>

    <hr/>

    <section class="meeting-cards">
      <h2>Upcoming</h2>
      <div v-if="this.upcomingFilteredMeetings.length === 0" id="no-upcoming-meetings">
        <div class="placeholder-page-container">
        <h2>Sit back, relax.</h2>
        <p>You have no upcoming meetings <span v-if="selectedTeam !== ''">in {{selectedTeam}}</span></p>
      </div> 
      </div>
      <div class="all-mtg-cards">
        <div v-for="meeting in upcomingFilteredMeetings" class="mtg-card">
          <router-link :to="{path: `/meetings/details/${meeting._id}`, params: { title: meeting.title }}" class="dropdown-item">
            <MeetingCard v-bind:meeting="meeting"></MeetingCard>
          </router-link>
        </div>
      </div>
    </section>

    <section v-if="this.pastFilteredMeetings.length > 0" class="meeting-cards">
      <hr/>
      <h2>Past</h2>
      <div class="all-mtg-cards">
        <div v-for="meeting in pastFilteredMeetings" class="mtg-card">
          <router-link :to="{path: `/meetings/details/${meeting._id}`, params: { title: meeting.title }}" class="dropdown-item">
            <MeetingCard v-bind:meeting="meeting"></MeetingCard>
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script>
import { meeting_data } from '../../data'
import MeetingCard from "../../components/meetings/MeetingCard"

window.moment = require('moment'); // for use on MeetingCard component

// Sorting function for meetings by time
function compare(a, b) {
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

export default {
  name: 'meetings',
  components: {
    MeetingCard
  },
  computed: {
    allTeamNames: function () {
      let teamsSet = new Set();
      for (const meeting of this.meeting_data.all_meetings) {
        teamsSet.add(meeting.team.name);
      }
      return Array.from(teamsSet.values()).sort();
    },
    upcomingFilteredMeetings: function () {
      let chosenTeam = this.selectedTeam;
      let filteredMeetings = this.meeting_data.all_meetings.filter(meeting => meeting.team.name === chosenTeam);

      const now = Date.now();

      if (chosenTeam !== "") {
        let futureMeetings = filteredMeetings.filter(meeting => meeting.time > now)
        futureMeetings.sort(compare);
        return futureMeetings.filter(meeting => meeting.team.name === this.selectedTeam)
      } else {
        let futureMeetings = this.meeting_data.all_meetings.filter(meeting => meeting.time > now);
        futureMeetings.sort(compare);
        return futureMeetings;
      }
    },
    pastFilteredMeetings: function () {
      let chosenTeam = this.selectedTeam;
      let filteredMeetings = this.meeting_data.all_meetings.filter(meeting => meeting.team.name === chosenTeam);

      const now = Date.now();

      if (chosenTeam !== "") {
        let pastMeetings = filteredMeetings.filter(meeting => meeting.time <= now)
        pastMeetings.sort(compare);
        return pastMeetings.filter(meeting => meeting.team.name === this.selectedTeam)
      } else {
        let pastMeetings = this.meeting_data.all_meetings.filter(meeting => meeting.time <= now);
        return pastMeetings
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('from Meeting mounted ' + this.$route.name);
      meeting_data.meeting.get()
    })
  },
  data: function () {
    return {
      selectedTeam: "",
      meeting_data: meeting_data
    }
  }
}
</script>
